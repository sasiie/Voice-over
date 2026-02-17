import { Link } from "@tanstack/react-router";
import ChatList from "./chatList";
import { useChats } from "../hooks/useChats";
import { useState } from "react";
import { Users, Menu, SquarePen, TableOfContents, X } from "lucide-react";

export default function Header() {
  const { chats, activeChatId, setActiveChatId, createChat } = useChats();
  const [isOpen, setIsOpen] = useState(false);

  console.log("CHATS:", chats);

  return (
    <>
      <header className="p-4 flex items-center bg-gray-800 text-white shadow-lg">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="ml-4 text-xl font-semibold">
          <Link to="/">
            <p>HEM</p>
          </Link>
        </h1>
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Navigation</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                "bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-3 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10",
            }}
          >
            <Users size={20} />
            <span className="font-medium">Om oss</span>
          </Link>

          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                "bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-3 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10",
            }}
          >
            <SquarePen size={20} />
            <span className="font-medium">Börja ny chatt </span>
          </Link>

          <div className="flex flex-col justify-between pt-22">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex-1 flex items-center gap-3 p-3"
              activeProps={{
                className: "border-b border-gray-700",
              }}
            >
              <TableOfContents size={20} />
              <span className="font-medium">Dina chattar</span>
            </Link>

            <ChatList
              chats={chats}
              activeChatId={activeChatId}
              onSelect={setActiveChatId}
            />
            <button
              className="text-white bg-cyan-600 px-3 py-2 rounded"
              onClick={() =>
                createChat("Testchat " + new Date().toLocaleTimeString())
              }
            >
              Skapa testchat
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}
