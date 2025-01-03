"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, {useState} from 'react'

function CreatePostPage() {
    // State
    const [title, setTitle] = useState('');
    const [img, setImg] = useState('');
    const [content, setContent] = useState('')
    // Router
    const router = useRouter();
    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !img || !content) {
            alert("Please complete all inputs.");
            return;      
        }

        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, img, content })
            })

            if (res.ok) {
                router.push("/");
            } else {
                throw new Error("Failed to create a post");
            }

        } catch(error) {
            console.log(error);
        }
    }


  return (
    <div className='container mx-auto py-10'>
      <h3 className="text-3xl font-bold">Create Post</h3>
      <hr className="my-3" />
      <Link href="/" className="bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2">Go Back</Link>
      <form action="" onSubmit={handleSubmit}>
        <input onChange={(e) => setTitle(e.target.value)} type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Post Title'/>
        <input onChange={(e) => setImg(e.target.value)}  type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Post Img Url'/>
        
        <textarea onChange={(e) => setContent(e.target.value)}  name='' id='' cols={30} rows={10} className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Enter your Content'></textarea>
        <button type="submit" className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>Create Post</button>
      </form>
    </div>
  )
}

export default CreatePostPage
