"use client";

import { useOthers, useSelf } from "@/liveblocks.config";
import { UserAvatar } from "./user-avatar";
import { connectionIdColor } from "@/lib/utils";

const MAX_SHOWN_USERS = 2;

export const Participants = () => {
  const users = useOthers();
  const currentUsers = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USERS;
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md ">
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              borderColor={connectionIdColor(connectionId)}
              key={connectionId}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.[0] || "A"}
            />
          );
        })}

        {currentUsers && (
          <UserAvatar
            borderColor={connectionIdColor(currentUsers.connectionId)}
            src={currentUsers.info?.picture}
            name={`${currentUsers.info?.name} (You)`}
            fallback={currentUsers.info?.name?.[0] || "A"}
          />
        )}

        {hasMoreUsers && (
          <UserAvatar
            name={`${users?.length - MAX_SHOWN_USERS} more`}
            fallback={`+${users.length - MAX_SHOWN_USERS}`}
          />
        )}
      </div>
    </div>
  );
};

export function ParticipantsSkeleton() {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px] animate-pulse" />
  );
}
