"use client";

import { useSelf } from "@/liveblocks.config";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";

interface Props {
  boardId: string;
}

export const Canvas = ({ boardId }: Props) => {
  const info = useSelf((me) => me.info);
  console.log(info);

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info />
      <Participants />
      <Toolbar />
    </main>
  );
};
