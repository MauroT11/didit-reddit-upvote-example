import { PostList } from "../components/PostList";

export const metadata = {
  title: "Didit - Posts",
  description: "A social app like Reddit or Hacker News",
};

export default async function Home() {
  return <PostList />;
}
