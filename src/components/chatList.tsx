import { Link } from "@tanstack/react-router";
import { Chat } from "../hooks/useChats";
import { Pin, Star } from "lucide-react";

type Props = {
  chats: Chat[];
  activeChatId: string | null;
  onSelect: (id: string) => void;
};

export default function ChatList({ chats, activeChatId, onSelect }: Props) {
  if (chats.length === 0){
  return (
    <div className="px-2 text-sm text-muted-foreground">
      Inga sparad chattar ännu.
      </div>
  );
}
 const sortedChats = [...chats].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

return (
  <div className="space-y-1 px-2">
    {chats.map((chat) => (
      <Link
          key={chat.id}
          to="/chats"
          onClick={() => onSelect(chat.id)}
          className={`w-full text-left px-3 py-2 rounded-lg transition 
    ${chat.id === activeChatId ? "bg-white/10" : "hover:bg-slate-800"}`}
        >
                    <div className="flex items-center gap-2">
          <span className="truncate font-medium">{chat.title}</span>
         {chat.pinned && <Pin size={14} className="text-cyan-400" />}
            {chat.favorite && <Star size={14} className="text-yellow-400" />}
          </div>
          <div className="truncate text-xs text-slate-400">
            {chat.transcript}
            </div>
        </Link>
      ))}
    </div>
  );
}
