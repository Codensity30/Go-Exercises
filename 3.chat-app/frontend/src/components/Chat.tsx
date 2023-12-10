import { ChangeEvent } from "react";

const Chat = ({
  msg,
  handleMsgChange,
}: {
  msg: string;
  handleMsgChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <input type="text" value={msg} onChange={handleMsgChange} />
    </div>
  );
};

export default Chat;
