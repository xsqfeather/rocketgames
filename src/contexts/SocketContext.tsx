import { createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { ENDPOINT } from "../constants";
import { useNavigate } from "react-router-dom";
import { SnackbarContext } from "./SnackbarContext";

export const SocketContext = createContext<Socket | null>(null);
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const nav = useNavigate();
  const { showNotify } = useContext(SnackbarContext);

  useEffect(() => {
    const socket = io(`${ENDPOINT}`, {
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      console.log("connect");
      setSocket(socket);
      console.log("login", {
        seq: "1",
        accountID: localStorage.getItem("accountID"),
        session: localStorage.getItem("token"),
      });
      socket.emit("/user/lobby/lobbyHandler/login", {
        seq: "1",
        accountID: localStorage.getItem("accountID"),
        session: localStorage.getItem("token"),
      });
    });

    socket.on("disconnect", () => {
      console.log("disconnect");
      setSocket(null);
      showNotify({
        message: "連線已斷開",
        color: "warning",
        variant: "soft",
      });
    });

    socket.on("connect_error", (err) => {
      if (err) {
        console.error(err.message);
        localStorage.clear();
        nav("/auth/login");
        showNotify({
          message: "連線已斷開",
          color: "warning",
          variant: "soft",
        });
      }
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
