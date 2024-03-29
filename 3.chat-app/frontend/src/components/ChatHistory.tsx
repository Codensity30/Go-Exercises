const ChatHistory = ({ chatHistory }: { chatHistory: string[] }) => {
  const messages = chatHistory.map((msg, index) => <p key={index}>{msg}</p>);

  return (
    <div className="ChatHistory">
      <h2>Chat History</h2>
      {messages}
    </div>
  );
};

export default ChatHistory;
