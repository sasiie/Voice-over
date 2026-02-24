import { Chat } from "../hooks/useChats";

type Props = {
  chats: Chat[];
  activeChatId: string | null;
  onSelect: (id: string) => void;
};

export default function ChatList({
  chats,
  activeChatId,
  onSelect,
}: Props) {
  return (
    <div>
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onSelect(chat.id)}
          style={{
            padding: "8px 10px",
            borderRadius: 8,
            cursor: "pointer",
            background:
              chat.id === activeChatId
                ? "rgba(255,255,255,0.1)"
                : "transparent",
          }}
        >
          {chat.title}
        </div>
      ))}
    </div>
  );
}
