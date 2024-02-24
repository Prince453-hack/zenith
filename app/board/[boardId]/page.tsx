import React from "react";
import { Canvas } from "./_components/canvas";

interface Props {
  params: {
    boardId: string;
  };
}

const Page = ({ params }: Props) => {
  return <Canvas boardId={params.boardId} />;
};

export default Page;
