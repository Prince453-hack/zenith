import { useMutation, useSelf } from "@/liveblocks.config";

export const useDeleteLayer = () => {
  const selection = useSelf((me) => me.presence.selection);

  return useMutation(
    ({ storage, setMyPresence }) => {
      const liveLayers = storage.get("layers");
      const liveLayerId = storage.get("layerIds");

      for (const id of selection) {
        liveLayers.delete(id);

        const index = liveLayerId.indexOf(id);

        if (index !== -1) {
          liveLayerId.delete(index);
        }
      }

      setMyPresence({ selection: [] }, { addToHistory: true });
    },
    [selection]
  );
};
