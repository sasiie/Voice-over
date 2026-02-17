import { Chat } from "../hooks/useChats";

type Props = {
  chats: Chat[];
  activeChatId: string | null;
  onSelect: (id: string) => void;
};

export default function ChatList({ chats, activeChatId, onSelect }: Props) {
  return (
    <div>
      {chats.slice(0,3).map((chat) => (
        <button
          key={chat.id}
          onClick={() => onSelect(chat.id)}
          className={`w-full text-left px-3 py-2 rounded-lg transition 
    ${chat.id === activeChatId ? "bg-white/10" : "hover:bg-slate-800"}`}
        >
          {chat.title}
        </button>
      ))}
    </div>
  );
}
