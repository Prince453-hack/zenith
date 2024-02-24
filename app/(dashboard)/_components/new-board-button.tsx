"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  orgId: string;
  disabled?: boolean;
}

export const NewBoardButton = ({ orgId, disabled }: Props) => {
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.board.create);

  function onClick() {
    mutate({
      orgId,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created successfully!");
        router.push(`/board/${id}`);
      })
      .catch(() => {
        toast.error("Failed to create board!");
      });
  }

  return (
    <button
      disabled={pending || disabled}
      onClick={onClick}
      className={cn(
        "col-span-1 aspect-[100/127] bg-amber-500 rounded-lg hover:bg-amber-600 flex flex-col items-center justify-center py-6",
        (pending || disabled) &&
          "opacity-75 cursor-not-allowed hover:bg-amber-500"
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-xs text-white font-light">New Board</p>
    </button>
  );
};
