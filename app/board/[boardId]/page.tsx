import React from "react";
import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { Loading } from "./_components/canvas-loading";

interface Props {
  params: {
    boardId: string;
  };
}

const Page = ({ params }: Props) => {
  return (
    <Room roomId={params.boardId} fallback={<Loading />}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
};

export default Page;
