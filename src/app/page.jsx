"use client";

import { useState, useEffect } from 'react'
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  const [postData, setPostData] = useState([]);
  console.log(postData);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/posts");
      const data = await res.json();
      setPostData(data);
    } catch (error) {
      console.log(error);
    }
  }

  const deletePost = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete post');
      }
      fetchPosts();
      // router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="container mx-auto h-screen bg-white p-5">
      <h1>Next JS</h1>
      <hr className="my-3" />
      <button className="bg-green-500 p-3 text-white rounded"><Link href="/create">Create Post</Link></button>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-3 my-3 gap-4">
        {postData.map((post) => (
            <div key={post._id} className="flex flex-col justify-center md:justify-start items-center shadow-xl my-10 p-10 rounded-xl jus">
              <Image src={post.img} width={300} height={200} priority={true} alt={post.title} className='object-contain' />
              <h4>{post.title}</h4>
              <p className="text-wrap break-words">{post.content}</p>
              <div className='mt-5'>
                <Link className="bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2" href={`/edit/${post._id}`}>Edit</Link>
                <button className="bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2" onClick={() => deletePost(post._id)}>Delete</button>
              </div>
            </div>
        ))}
        </div>
    </main>
  );
}
