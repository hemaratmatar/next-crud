import { NextResponse } from 'next/server';
import {connectDB} from '../../../../../lib/mongodb';
import Post from '../../../../../models/post';


export async function GET(req, {params}) {
    const { id } = await  params;

    // console.log(params.id);
    
    await connectDB();
    const post = await Post.findOne({_id : id});
    return NextResponse.json({post}, {status: 201});
}

export async function PUT(req, {params}) {
    const { id } = await params;
    const { title, img, content } = await req.json();
    await connectDB();
    const post = await Post.findOneAndUpdate({_id: id}, {title, img, content});
    return NextResponse.json({message:"post updated"}, {status: 200});
    
}

// export async function Delete(req, res) {
//     const { id } = req.params;
//     console.log(id);
    
    // await connectDB();
    // await Post.findByIdAndDelete(id);
    // return NextResponse.json({message: 'Post Deleted'});
// }
export async function DELETE(req, {params}) {
    // const id = params.url.searchParams.get("id");
    // console.log(params);
    const { id } = await params;
    
    
    await connectDB();
    await Post.findByIdAndDelete(id);
    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
}