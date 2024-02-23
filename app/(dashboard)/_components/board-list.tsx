"use client";

import { EmptySearch } from "./empty-search";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

export function BoardList({ orgId, query }: BoardListProps) {
  const data = [];

  if (!data.length && query.search) {
    return (
      <EmptySearch
        url="/nosearch.png"
        title="No result found!"
        sub="Try searching something else."
      />
    );
  }

  if (!data.length && query.favorites) {
    return (
      <EmptySearch
        url="/fav.png"
        title="No favorites!"
        sub="Try favorting a board."
      />
    );
  }

  if (!data.length) {
    return (
      <EmptySearch
        url="/noslate.png"
        title="Create your first board!"
        sub="Start by creating a board for your organization."
      />
    );
  }

  return (
    <div className="">
      <div className="">{JSON.stringify(query)}</div>
    </div>
  );
}
