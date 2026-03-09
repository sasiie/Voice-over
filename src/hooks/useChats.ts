import { useEffect, useState } from "react";

export type Chat = {
  id: string;
  title: string;
  transcript: string;
  language: string;
  createdAt: string;
  favorite: boolean;
  important: boolean;
};

const STORAGE_KEY = "my_chats";
const ACTIVE_CHAT_KEY = "my_active_chat";

export function useChats() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatIdState] = useState<string | null>(null);

  useEffect(() => {
    const savedChats = localStorage.getItem(STORAGE_KEY);
    const savedActiveChatId = localStorage.getItem(ACTIVE_CHAT_KEY);
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    }
    if (savedActiveChatId){
      setActiveChatIdState(savedActiveChatId);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    if (activeChatId) {
      localStorage.setItem(ACTIVE_CHAT_KEY, activeChatId);
    } else {
      localStorage.removeItem(ACTIVE_CHAT_KEY);
    }
  }, [activeChatId]);

  function setActiveChatId(id: string | null){
    setActiveChatIdState(id);
  }

  function createChat(data: {
    title: string;
    transcript: string;
    language: string;
    }) {
 const newChat: Chat = {
  id: crypto.randomUUID(),
  title: data.title,
  transcript: data.transcript,
  language: data.language,
  createdAt: new Date().toISOString(),
  favorite: false,
  important: false,
 };

setChats((prev) => [newChat, ...prev]);
setActiveChatIdState(newChat.id);
return newChat;
    }

  function deleteChat(id: string) {
    setChats((prev) => prev.filter((chat) => chat.id !== id));
    if (activeChatId === id) {
      setActiveChatIdState(null);
    }
  }

  function toggleFavorite(id:string) {
    setChats((prev) => 
    prev.map((chat) =>
    chat.id === id ? {...chat, favorite: !chat.favorite } : chat
  )
);
  }
  function toggleImportant(id: string){
    setChats((prev) =>
    prev.map((chat) =>
    chat.id === id ? {...chat, important: !chat.important } : chat
  )
);
  }
  function updateChatTranscript(id: string, transcript: string) {
    setChats((prev) =>
    prev.map((chat) =>
    chat.id === id ? {...chat, transcript } : chat
  )
);
  }
  const activeChat = chats.find((chat) => chat.id === activeChatId) ?? null;
  return {
    chats,
    activeChat,
    activeChatId,
    setActiveChatId,
    createChat,
    deleteChat,
    toggleFavorite,
    toggleImportant,
    updateChatTranscript,
  };
}
