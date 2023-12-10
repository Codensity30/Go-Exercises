const socket: WebSocket = new WebSocket("ws://localhost:8080/ws");

const connect = (handleChat: (ele: string) => void): void => {
  console.log("Attempting Connection...");

  socket.onopen = (): void => {
    console.log("Successfully Connected");
  };

  socket.onmessage = (msg: MessageEvent): void => {
    handleChat(msg.data);
    console.log(msg.data);
  };

  socket.onclose = (event: CloseEvent): void => {
    console.log("Socket Closed Connection: ", event);
  };

  socket.onerror = (error: Event): void => {
    console.log("Socket Error: ", error);
  };
};

const sendMsg = (msg: string): void => {
  console.log("sending msg: ", msg);
  socket.send(msg);
};

export { connect, sendMsg };
