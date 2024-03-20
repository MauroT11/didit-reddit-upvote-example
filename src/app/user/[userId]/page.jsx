import { db } from "@/db";
import { Vote } from "@/components/Vote";
import { auth } from "@/auth";
import Link from "next/link";

export async function generateMetadata({ params }, parent) {
    const session = await auth();
  
    return {
      title: `Didit User - ${session.user.name}`,
      description: `${session.user.name}'s User Profile`,
    };
  }

export default async function Page({params}) {

    // console.log(params)

    const { rows: posts } = await db.query(
        `SELECT posts.id, posts.title, posts.body, posts.created_at, users.name, 
        COALESCE(SUM(votes.vote), 0) AS vote_total
        FROM posts
        JOIN users ON posts.user_id = users.id
        LEFT JOIN votes ON votes.post_id = posts.id
        WHERE posts.user_id = $1
        GROUP BY posts.id, users.name`,
        [params.userId]
      );

      const post = posts[0];
      console.log(post)
    return (
        <div className="max-w-screen-lg mx-auto pt-4 pr-4 items-center flex flex-col gap-4">
            <h1 className="text-4xl">{post.name}</h1>
            {/* <div className="grid grid-cols-3 gap-4"> */}
            <div className="flex gap-4">
                {posts.map((post) => (
                    <li
                        key={post.id}
                        className=" py-4 px-2 flex space-x-6 hover:bg-zinc-200 rounded-lg"
                    >
                        <Vote postId={post.id} votes={post.vote_total} />
                        <div>
                        <Link
                            href={`/post/${post.id}`}
                            className="text-3xl hover:text-pink-500"
                        >
                            {post.title}
                        </Link>
                        <p className="text-zinc-400">posted by {post.name}</p>
                        </div>
                    </li>
                ))}
            </div>
        </div>
    )
}