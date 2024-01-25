import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../contexts/SocketContext";
import { useNavigate } from "react-router-dom";
import useInterval from "beautiful-react-hooks/useInterval";

export default function useRocketGame() {
  const socket = useContext(SocketContext);
  const nav = useNavigate();

  const [tableStatus, setTableStatus] = useState("UNKNOWN");
  const [isBet, setIsBet] = useState(false);

  const [ticks, setTicks] = useState(0);

  const [records, setRecords] = useState<any[]>([]);

  const [betId, setBetId] = useState("");

  const [cashOutPoint, setCashOutPoint] = useState(0);

  const [betRecord, setBetRecord] = useState({
    betMoney: 0,
    point: 0,
    profit: 0,
    winMoney: 0,
  });
  useInterval(() => {
    setTicks(1 + ticks);
  }, 100);

  useEffect(() => {
    socket?.emit("/user/rocket/rocketHandler/joinGame", {
      seq: "1",
      game: "rocket",
      accountID: localStorage.getItem("accountID"),
      session: localStorage.getItem("token"),
    });
  }, [socket]);

  useEffect(() => {
    socket?.on("/user/rocket/rocketHandler/joinGame", (data: any) => {
      const joinRlt = data;
      console.log("/user/rocket/rocketHandler/joinGame", joinRlt);

      if (joinRlt.code === 520) {
        localStorage.clear();
        nav("/auth/login");
        return;
      }
      if (joinRlt.code === 200) {
        setTableStatus(joinRlt?.state);
        setTicks(joinRlt?.ticks);
        setRecords(joinRlt?.gameRecords || []);
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
      console.log("/user/rocket/rocketHandler/escape", data);
      setRecords(data?.gameRecords || []);
      setBetRecord({
        ...betRecord,
        betMoney: data.result.chips,
        point: data.cashOutPoint,
        winMoney: data.result.winChips,
      });
    });

    return () => {
      socket?.off("/user/rocket/rocketHandler/escape");
    };
  }, [socket]);

  useEffect(() => {
    socket?.on("/user/rocket/rocketHandler/bet", (data: any) => {
      console.log("/user/rocket/rocketHandler/bet", data);
      if (data.code === 200) {
        setRecords(data?.gameRecords);
        setBetId(data?.betId);
      }
    });
    return () => {
      socket?.off("/user/rocket/rocketHandler/bet");
    };
  }, [socket]);

  useEffect(() => {
    socket?.on("/ind/rocket/table/status", (data: any) => {
      const tableStatus = data;
      setTicks(0);
      setRecords(data?.gameRecords || []);
      console.log("/ind/rocket/table/status", tableStatus);
      setTableStatus(tableStatus?.state);
      if (tableStatus?.state !== tableStatus) {
        const ticks = tableStatus?.ticks;
        setTicks(ticks);
      }
      setIsBet(tableStatus.isBet);
    });
    return () => {
      socket?.off("/ind/rocket/table/status");
    };
  }, [socket]);

  useEffect(() => {
    socket?.on("/ind/rocket/table/points", (data: any) => {
      setCashOutPoint(data.cashOutPoint);
    });
    return () => {
      socket?.off("/ind/rocket/table/points");
    };
  }, [socket]);

  useEffect(() => {
    if (tableStatus === "FINISH" && betRecord?.betMoney > 0) {
      setBetRecord({
        betMoney: 0,
        point: 0,
        profit: 0,
        winMoney: 0,
      });
    }
  }, [tableStatus, betRecord?.betMoney]);

  const handleBetBtn = () => {
    setIsBet(true);
    console.log("handleBetBtn", {
      game: "rocket",
      accountID: localStorage.getItem("accountID"),
      session: localStorage.getItem("token"),
      amount: 10,
    });
    socket?.emit("/user/rocket/rocketHandler/bet", {
      game: "rocket",
      accountID: localStorage.getItem("accountID"),
      session: localStorage.getItem("token"),
      amount: 10,
    });
    console.log("betRecord======", betRecord?.betMoney + 10);
    setBetRecord({
      betMoney: betRecord?.betMoney + 10,
      point: 0,
      profit: 0,
      winMoney: 0,
    });
  };

  const handleEscape = () => {
    setIsBet(false);
    console.log("handleEscape", {
      game: "rocket",
      accountID: localStorage.getItem("accountID"),
      session: localStorage.getItem("token"),
    });
    socket?.emit("/user/rocket/rocketHandler/escape", {
      game: "rocket",
      accountID: localStorage.getItem("accountID"),
      session: localStorage.getItem("token"),
      betId,
    });
  };

  const handleBeginRecord = () => {
    setIsBet(false);
    socket?.emit("/user/rocket/rocketHandler/beginRecord", {
      game: "rocket",
      accountID: localStorage.getItem("accountID"),
      session: localStorage.getItem("token"),
    });
  };
  return {
    tableStatus,
    cashOutPoint,
    ticks,
    isBet,
    handleBetBtn,
    handleEscape,
    handleBeginRecord,
    betRecord,
    records,
  };
}
