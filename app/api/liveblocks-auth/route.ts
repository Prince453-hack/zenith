import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_mQBr9Znq9uLPzcPU9INWXjyTeKdSAG1PbuPEZFYYEIsx8LOD31F7iKdr2qyMHX3W",
});

export async function POST(req: Request) {
  const authorization = await auth();
  const user = await currentUser();

  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { room } = await req.json();
  const board = await convex.query(api.board.get, { id: room });

  if (board?.orgId !== authorization.orgId) {
    return new Response("Unauthorized", { status: 403 });
  }

  const userInfo = {
    name: user.firstName || "Anonymous",
    picture: user.imageUrl!,
  };

  const session = liveblocks.prepareSession(user.id, { userInfo });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { body, status } = await session.authorize();
  return new Response(body, { status });
}
