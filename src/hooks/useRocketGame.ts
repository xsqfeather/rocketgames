import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../contexts/SocketContext";
import { useNavigate } from "react-router-dom";
import useInterval from "beautiful-react-hooks/useInterval";

export default function useRocketGame() {
  const socket = useContext(SocketContext);
  const nav = useNavigate();

  const [tableStatus, setTableStatus] = useState("UNKNOWN");

  const [ticks, setTicks] = useState(0);

  const [isBets, setIsBets] = useState([false, false]);

  const [records, setRecords] = useState<any[]>([]);

  const [betId, setBetId] = useState("");

  const [cashOutPoint, setCashOutPoint] = useState(0);

  useInterval(() => {
    setTicks(1 + ticks);
  }, 100);

  useEffect(() => {
    const input = {
      seq: "1",
      game: "rocket",
      accountID: localStorage.getItem("accountID"),
      session: localStorage.getItem("token"),
    };
    console.log("input:/user/rocket/rocketHandler/joinGame", input);
    socket?.emit("/user/rocket/rocketHandler/joinGame", input);
  }, [socket]);

  useEffect(() => {
    socket?.on("/user/rocket/rocketHandler/joinGame", (data: any) => {
      console.log("output:/user/rocket/rocketHandler/joinGame", data);
      const joinRlt = data;
      console.log("/user/rocket/rocketHandler/joinGame", joinRlt);

      if (joinRlt.code === 520) {
        localStorage.clear();
        nav("/auth/login");
        return;
      }
      if (joinRlt.code === 200) {
        setTableStatus(joinRlt?.data.state);
        setTicks(joinRlt?.data.ticks);
        setRecords(joinRlt?.data.gameRecords || []);
      }
    });
    return () => {
      socket?.off("/user/rocket/rocketHandler/joinGame");
    };
  }, [socket]);

  useEffect(() => {
    socket?.on("/ind/rocket/playerEnter", (data: any) => {
      console.log("/ind/rocket/playerEnter", data);
    });
    return () => {
      socket?.off("/ind/rocket/playerEnter");
    };
  }, [socket]);

  useEffect(() => {
    socket?.on("/user/rocket/rocketHandler/escape", (data: any) => {
      console.log("output:/user/rocket/rocketHandler/escape", data);
      if (data.code === 200) {
        setRecords([data?.data.result, ...records, ...data?.data.gameRecords]);
        setBetId(data.data.result.betId);
        setIsBets(data.data.isBet);
      }
    });

    return () => {
      socket?.off("/user/rocket/rocketHandler/escape");
    };
  }, [socket, records, isBets]);

  useEffect(() => {
    socket?.on("/user/rocket/rocketHandler/bet", (data: any) => {
      console.log("/user/rocket/rocketHandler/bet", data);
      if (data.code === 200) {
        setRecords([data?.data.result, ...records, ...data?.data.gameRecords]);
        setBetId(data.data.result.betId);
        setIsBets(data.data.isBet);
      }
    });
    return () => {
      socket?.off("/user/rocket/rocketHandler/bet");
    };
  }, [socket, records, isBets]);

  useEffect(() => {
    socket?.on("/ind/rocket/table/status", (data: any) => {
      console.log("output:/ind/rocket/table/status", data);
      const tableStatus = data;
      const gameRecords = tableStatus?.gameRecords;
      const recordNotInRecords = gameRecords?.filter(
        (record: any) => !records?.find((r) => r.betId === record.betId)
      );
      setRecords([...recordNotInRecords, ...records]);

      setTableStatus(tableStatus?.state);
      if (tableStatus?.state !== tableStatus) {
        const ticks = tableStatus?.ticks;
        setTicks(ticks);
      }
      if (tableStatus?.state === "FINISH") {
        setIsBets([false, false]);
      }
    });
    return () => {
      socket?.off("/ind/rocket/table/status");
    };
  }, [records, socket]);

  useEffect(() => {
    socket?.on("/ind/rocket/table/points", (data: any) => {
      setCashOutPoint(data.cashOutPoint);
    });
    return () => {
      socket?.off("/ind/rocket/table/points");
    };
  }, [socket]);

  const handleBetBtn = (tag = 1) => {
    const input = {
      game: "rocket",
      accountID: localStorage.getItem("accountID"),
      session: localStorage.getItem("token"),
      amount: 10,
      tag,
    };
    console.log("input:/user/rocket/rocketHandler/bet", input);
    socket?.emit("/user/rocket/rocketHandler/bet", input);
  };

  const handleEscape = (tag = 1) => {
    const input = {
      game: "rocket",
      accountID: localStorage.getItem("accountID"),
      session: localStorage.getItem("token"),
      betId,
      tag,
    };
    console.log("input:/user/rocket/rocketHandler/escape", input);
    socket?.emit("/user/rocket/rocketHandler/escape", input);
  };

  return {
    tableStatus,
    cashOutPoint,
    ticks,
    isBets,
    handleBetBtn,
    handleEscape,
    records,
  };
}
