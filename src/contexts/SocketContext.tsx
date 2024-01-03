import { createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { ENDPOINT } from "../constants";
import { useNavigate } from "react-router-dom";

export const SocketContext = createContext<Socket | null>(null);
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const nav = useNavigate();
  useEffect(() => {
    const socket = io(`${ENDPOINT}`, {
      transports: ["websocket"],
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

    socket.on("disconnect", () => {
      console.log("disconnect");
      setSocket(null);
    });
  }, []);
  useEffect(() => {
    socket?.on("/user/lobby/lobbyHandler/login", (msg) => {
      console.log("/lobby/login", msg);
      if (msg.message === "invalid session") {
        localStorage.removeItem("accountID");
        localStorage.removeItem("token");
        nav("/auth/login");
      }
    });
    return () => {
      socket?.off("/user/lobby/lobbyHandler/login");
    };
  }, [socket]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
