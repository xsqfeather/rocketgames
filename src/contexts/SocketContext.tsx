import { createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { ENDPOINT } from "../constants";

export const SocketContext = createContext<Socket | null>(null);
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const socket = io(`${ENDPOINT}`, {
      transports: ["websocket"],
    });
    console.log({
      seq: "1",
      accountID: localStorage.getItem("accountID"),
      session: localStorage.getItem("token"),
    });
    socket.on("connect", () => {
      console.log("connect");
      setSocket(socket);
      socket.emit("/user/lobby/lobbyHandler/login", {
        seq: "1",
        accountID: localStorage.getItem("accountID"),
        session: localStorage.getItem("token"),
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
