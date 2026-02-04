import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const wsRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [messages, setMessages] = useState([
    "hi there",
    "hello",
    "good morning",
  ]);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (event) => {
      setMessages((m) => [...m, event.data]);
    };
    wsRef.current = ws;
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "red",
          },
        }),
      );
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <>
      <div className="h-screen bg-black">
        <div className="h-[90vh] flex flex-col gap-8">
          <br />
          {messages.map((message, index) => (
            <div key={index}>
              <span className="p-4 border m-8 rounded-2xl bg-amber-50 text-black">
                {message}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-center  bg-amber-100 p-4">
          <div className="px-4 py-2 text-black max-w-lg rounded-4xl shadow flex justify-center gap-4">
            <input
              type="text"
              className="px-4 py-2 text-black max-w-lg border rounded-4xl"
              ref={inputRef}
            />
            <button
              className="rounded-4xl px-4 border py-2"
              onClick={() => {
                if (!inputRef.current) return;

                const message = inputRef.current.value.trim();
                if (!message) return;

                if (wsRef.current?.readyState === WebSocket.OPEN) {
                  wsRef.current.send(
                    JSON.stringify({
                      type: "chat",
                      payload: {
                        message: message,
                      },
                    }),
                  );
                }

                inputRef.current.value = "";
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
