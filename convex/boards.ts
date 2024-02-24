import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {
    orgId: v.string(),
  },
  handler: async (ctx, arg) => {
    const idetity = await ctx.auth.getUserIdentity();

    if (!idetity) {
      throw new Error("User not authenticated");
    }

    const boards = await ctx.db
      .query("boards")
      .withIndex("by_org", (q) => q.eq("orgId", arg.orgId))
      .order("desc")
      .collect();

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
