import { useEffect, useState, ChangeEvent } from "react";
import { connect, sendMsg } from "./api";
import ChatHistory from "./components/ChatHistory";
import Chat from "./components/Chat";

const App = () => {
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [msg, setMsg] = useState("");

  function handleMsgChange(e: ChangeEvent<HTMLInputElement>) {
    setMsg(e.target.value);
  }

  function handleChat(ele: string) {
    setChatHistory((prevHistory) => [...prevHistory, ele]);
  }

  useEffect(() => {
    connect(handleChat);
  }, []); // Make sure to pass an empty dependency array to run this effect only once

  const send = () => {
    sendMsg(msg);
    setMsg("");
  };

  return (
    <div className="App">
      <ChatHistory chatHistory={chatHistory} />
      <Chat msg={msg} handleMsgChange={handleMsgChange} />
      <button onClick={send} style={{ marginTop: "10px" }}>
        Send
      </button>
    </div>
  );
};

export default App;
