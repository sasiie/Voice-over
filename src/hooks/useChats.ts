import { useEffect, useState } from "react";

export type Chat = {
  id: string;
  title: string;
};

const STORAGE_KEY = "my_chats";

export function useChats() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);


  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setChats(JSON.parse(saved));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  }, [chats]);

  function createChat(title: string) {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      title,
    };

    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  }

  function deleteChat(id: string) {
    setChats((prev) => prev.filter((chat) => chat.id !== id));
    if (activeChatId === id) {
      setActiveChatId(null);
    }
  }

  return {
    chats,
    activeChatId,
    setActiveChatId,
    createChat,
    deleteChat,
  };
}
