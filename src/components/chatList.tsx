import { Chat } from "../hooks/useChats";

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
return (
  <div className="space-y-1 px-2">
    {chats.map((chat) => (
      <button
          key={chat.id}
          onClick={() => onSelect(chat.id)}
          className={`w-full text-left px-3 py-2 rounded-lg transition 
    ${chat.id === activeChatId ? "bg-white/10" : "hover:bg-slate-800"}`}
        >
          <div className="truncate font-medium">{chat.title}</div>
        </button>
      ))}
    </div>
  );
}
