"use client";

import { useQuery } from "convex/react";
import { EmptySearch } from "./empty-search";
import { api } from "@/convex/_generated/api";
import { BoardCard } from "./board-card";
import { NewBoardButton } from "./new-board-button";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

export function BoardList({ orgId, query }: BoardListProps) {
  const data = useQuery(api.boards.get, { orgId });

  if (data === undefined) {
    return (
      <div className="">
        <h2 className="text-3xl">
          {query.favorites ? "Favorite Boards" : "Team Boards"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton orgId={orgId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!data?.length && query.search) {
    return (
      <EmptySearch
        url="/nosearch.png"
        title="No result found!"
        sub="Try searching something else."
      />
    );
  }

  if (!data?.length && query.favorites) {
    return (
      <EmptySearch
        url="/fav.png"
        title="No favorites!"
        sub="Try favorting a board."
      />
    );
  }

  if (!data?.length) {
    return (
      <EmptySearch
        url="/noslate.png"
        title="Create your first board!"
        sub="Start by creating a board for your organization."
        button={true}
      />
    );
  }

  return (
    <div className="">
      <h2 className="text-3xl">
        {query.favorites ? "Favorite Boards" : "Team Boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton orgId={orgId} />
        {data?.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={board.orgId}
            isFavorite={false}
          />
        ))}
      </div>
    </div>
  );
}
