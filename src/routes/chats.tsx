import { createFileRoute } from "@tanstack/react-router";
import { useChats } from "@/hooks/useChats";
import { Pin, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
export const Route = createFileRoute("/chats")({
  component: ChatsPage,
});

function ChatsPage() {
  const {
    chats,
    activeChatId,
    setActiveChatId,
    activeChat,
    deleteChat,
    toggleFavorite,
    togglePinned,
  } = useChats();
const favoriteChats = useMemo(
  () => chats.filter((chat) => chat.favorite),
  [chats]
);

const pinnedChats = useMemo(
  () => chats.filter((chat) => chat.pinned),
  [chats]
);
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Dina chattar</h1>

      {chats.length === 0 ? (
        <p className="text-gray-400">Inga transkriberingar ännu.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          <div className="bg-gray-800 rounded-xl p-4 space-y-2">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={`w-full text-left rounded-lg p-3 transition ${
                  chat.id === activeChatId
                    ? "bg-cyan-600 text-white"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                <div className="font-medium truncate">{chat.title}</div>
                <div className="text-xs text-gray-300 truncate">
                  {new Date(chat.createdAt).toLocaleString("sv-SE")}
                </div>
              </button>
            ))}
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            {!activeChat ? (
              <p className="text-gray-400">Välj en chat i listan.</p>
            ) : (
              <>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      {activeChat.title}
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                      Språk: {activeChat.language} ·{" "}
                      {new Date(activeChat.createdAt).toLocaleString("sv-SE")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                        aria-label="Favoritisera chatten"
                      onClick={() => toggleFavorite(activeChat.id)}
                    >
                      <Star size={16} />
                      Favorit
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                        aria-label="Pinna chatten"
                      onClick={() => togglePinned(activeChat.id)}
                    >
                      <Pin size={16} />
                      Pinna
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                        aria-label="Radera chatten"
                      onClick={() => deleteChat(activeChat.id)}
                    >
                      <Trash2 size={16} />
                      Radera
                    </Button>
                  </div>
                </div>
                <div className="whitespace-pre-wrap text-gray-200 leading-7">
                  {activeChat.transcript}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
