"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { toast } from "sonner";

interface EmptySearchProps {
  url: string;
  title: string;
  sub: string;
  button?: boolean;
}

export const EmptySearch = ({ sub, title, url, button }: EmptySearchProps) => {
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick = () => {
    if (!organization) return;

    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created!");
      })
      .catch(() => toast.error("Failed to create board"));
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src={url} alt="image" width={250} height={250} />
      <h2 className="text-2xl font-semibold mt-5">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{sub}</p>

      {button && (
        <div className="mt-5">
          <Button disabled={pending} size="lg" onClick={onClick}>
            Create Board
          </Button>
        </div>
      )}
    </div>
  );
};
