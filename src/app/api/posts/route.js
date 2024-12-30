import { NextResponse } from 'next/server';
import {connectDB} from '../../../../lib/mongodb';
import Post from '../../../../models/post';

export async function POST(req, res) {
    console.log(req);
    const { title, img, content } = await req.json();
    console.log(title, img, content)
    try {
        await connectDB();
        await Post.create({title, content, img});
        return NextResponse.json({message: 'Post Created'}, {status: 201});
    } catch (error) {
        return NextResponse.error({message: error.message});
    }

    // await connectDB();
    // await Post.create({title, content, img});
    // if(!title || !content) {
    //     return NextResponse.badRequest({message: 'Title and Content are required'});
    // }else{
        // return NextResponse.json({message: 'Post Created'}, {status: 201});
    // }



//   if(req.method === 'POST') {
//     const {title, content, img} = req.body;
//     if(!title || !content) {
//       return NextResponse.badRequest({message: 'Title and Content are required'});
//     }
//     try {
//       const post = await Post.create({title, content, img});
//       return NextResponse.created(post);
//     } catch (error) {
//       return NextResponse.error({message: error.message});
//     }
//   }
//   return NextResponse.methodNotAllowed();
}   


export async function GET(req, res) {
    await connectDB();
    const posts = await Post.find({});
    return NextResponse.json(posts);
}


