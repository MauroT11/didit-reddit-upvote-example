import auth from "../app/middleware";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";

export async function UserInfo() {
  const session = await auth();

  return (
    <div>
      {session ? (
        <div className="flex items-center gap-2">
          <img
              src={session.user.image}
              alt={session.user.name}
              width={22}
              height={22}
              className="rounded-full"
            />
          {session.user.name}{" "}
          <span className="text-xs text-zinc-400 mr-3">#{session.user.id}</span>
          
          <LogoutButton />
        </div>
      ) : (
        <div>
          <span className="mr-4">Welcome, Guest!</span>
          <LoginButton />
        </div>
      )}
    </div>
  );
}
