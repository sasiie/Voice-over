import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

export type Chat = {
  id: string;
  title: string;
  transcript: string;
  language: string;
  createdAt: string;
  favorite: boolean;
  pinned: boolean;
};

type ChatsContextType = {
  chats: Chat[];
  activeChatId: string | null;
  activeChat: Chat | null;
  setActiveChatId: (id: string | null) => void;
  createChat: (data: {
    title: string;
    transcript: string;
    language: string;
  }) => Chat;
  deleteChat: (id: string) => void;
   toggleFavorite: (id: string) => void;
  togglePinned: (id: string) => void;
};

const STORAGE_KEY = "my_chats";
const ACTIVE_CHAT_KEY = "my_active_chat";

const ChatsContext = createContext<ChatsContextType | null>(null);

export function ChatsProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  useEffect(() => {
    const savedChats = localStorage.getItem(STORAGE_KEY);
    const savedActiveChat = localStorage.getItem(ACTIVE_CHAT_KEY);
    if (savedChats) {
      try {
        setChats(JSON.parse(savedChats));
      } catch {
        setChats([]);
      }
    }
    if (savedActiveChat) {
      setActiveChatId(savedActiveChat);
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

  function createChat(data: {
    title: string;
    transcript: string;
    language: string;
  }): Chat {
    const newChat: Chat = {
      id: String(Date.now()) + Math.random().toString(16).slice(2),
      title: data.title,
      transcript: data.transcript,
      language: data.language,
      createdAt: new Date().toISOString(),
      favorite: false,
      pinned: false,
    };

    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    return newChat;
  }

  function deleteChat(id: string) {
    setChats((prev) => prev.filter((chat) => chat.id !== id));
    setActiveChatId((prev) => (prev === id ? null : prev));
  }

  const activeChat = useMemo(
    () => chats.find((chat) => chat.id === activeChatId) ?? null,
    [chats, activeChatId],
  );

function toggleFavorite(id: string) {
  setChats((prev) =>
    prev.map((chat) =>
      chat.id === id ? { ...chat, favorite: !chat.favorite } : chat
    )
  );
}

function togglePinned(id: string) {
  setChats((prev) =>
    prev.map((chat) =>
      chat.id === id ? { ...chat, pinned: !chat.pinned } : chat
    )
  );
}
  
  const value = useMemo(
    () => ({
      chats,
      activeChat,
      activeChatId,
      setActiveChatId,
      createChat,
      deleteChat,
      toggleFavorite,
      togglePinned,
    }),
    [chats, activeChatId, activeChat],
  );
  return (
    <ChatsContext.Provider value={value}>{children}</ChatsContext.Provider>
  );
}
export function useChats() {
  const context = useContext(ChatsContext);
  if (!context) {
    throw new Error("Opps");
  }
  return context;
}
