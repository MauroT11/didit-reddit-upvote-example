import { CommentForm } from "@/components/CommentForm";
import { CommentList } from "@/components/CommentList";
import { Vote } from "@/components/Vote";
import { db } from "@/db";
import { auth } from "@/auth";
import Link from "next/link";

export async function generateMetadata({ params, searchParams }, parent) {
  // load the post
  const { rows: posts } = await db.query(`SELECT * FROM posts WHERE posts.id = $1`, [params.postId]);
  const post = posts[0]; // get the first one

  return {
    title: `Didit - ${post.title}`,
    description: "A social app like Reddit or Hacker News",
  };
}

export default async function SinglePostPage({ params }) {
  const session = await auth();

  console.log(session)
  const postId = params.postId;

  const { rows: posts } = await db.query(
    `SELECT posts.id, posts.title, posts.body, posts.created_at, users.name, 
    COALESCE(SUM(votes.vote), 0) AS vote_total
    FROM posts
    JOIN users ON posts.user_id = users.id
    LEFT JOIN votes ON votes.post_id = posts.id
    WHERE posts.id = $1
    GROUP BY posts.id, users.name
    LIMIT 1;`,
    [postId]
  );
  const post = posts[0];

  const { rows: votes } = await db.query(
    `SELECT *, users.name from votes
     JOIN users on votes.user_id = users.id`
  );

  return (
    <div className="max-w-screen-lg mx-auto pt-4 pr-4 items-center flex flex-col">
      <div className="flex space-x-6">
        <Vote postId={post.id} votes={post.vote_total} />
        <div className="">
          <h1 className="text-2xl">{post.title}</h1>
          <p className="text-zinc-400 mb-4">Posted by <Link href={`/user/${session.user.id}`} className="hover:underline">{post.name}</Link></p>
        </div>
      </div>
      <main className="whitespace-pre-wrap m-4">{post.body}</main>

      <CommentForm postId={post.id} />
      <CommentList postId={post.id} />
    </div>
  );
}
