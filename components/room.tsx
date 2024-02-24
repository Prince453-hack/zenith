"use client";

import { RoomProvider } from "@/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";

interface Props {
  children: React.ReactNode;
  roomId: string;
}

export const Room = ({ children, roomId }: Props) => {
  return (
    <RoomProvider id={roomId} initialPresence={{}}>
      <ClientSideSuspense fallback={<div>Loading</div>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};
