import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"

export const Route = createFileRoute("/chats")({
  component: ChatsPage,
})

function ChatsPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<string[]>([])

  function handleSend() {
    if (message.trim() === "") return

    setMessages([...messages, message])
    setMessage("")
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">New Chat</h1>

      <div className="bg-gray-800 p-4 rounded-lg mb-4 min-h-[200px]">
        {messages.length === 0 ? (
          <p className="text-gray-400">No messages yet...</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="mb-2 p-2 bg-gray-700 rounded">
              {msg}
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded bg-gray-700 text-white"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  )
}