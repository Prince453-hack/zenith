import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAllOrThrow } from "convex-helpers/server/relationships";

export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, arg) => {
    const idetity = await ctx.auth.getUserIdentity();

    if (!idetity) {
      throw new Error("User not authenticated");
    }

    if (arg.favorites) {
      const favoritedBoard = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", idetity.subject).eq("orgId", arg.orgId)
        )
        .order("desc")
        .collect();

      const ids = favoritedBoard.map((b) => b.boardId);
      const boards = await getAllOrThrow(ctx.db, ids);

      return boards.map((board) => ({ ...board, isFavorite: true }));
    }

    const title = arg.search as string;
    let boards = [];

    if (title) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", title).eq("orgId", arg.orgId)
        )
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", arg.orgId))
        .order("desc")
        .collect();
    }

    const boardsWithFavoritesRelation = boards.map((board) => {
      return ctx.db
        .query("userFavorites")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", idetity.subject).eq("boardId", board._id)
        )
        .unique()
        .then((favorite) => {
          return { ...board, isFavorite: !!favorite };
        });
    });

    const boardsWithFavoritesBoolean = Promise.all(boardsWithFavoritesRelation);
    return boardsWithFavoritesBoolean;
  },
});
