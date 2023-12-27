import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import { useNavigate } from "react-router-dom";
import { Box, Button, Group, Stack, Table, Title, Text } from "@mantine/core";
import { IconRocket, IconRocketOff, IconSparkles } from "@tabler/icons-react";
import { useInterval } from "@mantine/hooks";

export default function RocketPage() {
  const socket = useContext(SocketContext);
  const nav = useNavigate();

  const [tableStatus, setTableStatus] = useState("UNKNOWN");
  const [isBet, setIsBet] = useState(false);

  const [ticks, setTicks] = useState(0);
  const interval = useInterval(() => setTicks((s) => s + 1), 100);

  const [records, setRecords] = useState<any[]>([]);

  const [betRecord, setBetRecord] = useState({
    betMoney: 0,
    point: 0,
    profit: 0,
    winMoney: 0,
  });

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

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
      setBetRecord(data?.result);
    });

    return () => {
      socket?.off("/user/rocket/rocketHandler/escape");
    };
  }, [socket]);

  useEffect(() => {
    socket?.on("/user/rocket/rocketHandler/bet", (data: any) => {
      console.log("/user/rocket/rocketHandler/bet", data);
    });
    return () => {
      socket?.off("/user/rocket/rocketHandler/bet");
    };
  }, [socket]);

  useEffect(() => {
    socket?.on("/ind/rocket/table/status", (data: any) => {
      const tableStatus = data;
      setTicks(0);
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
    if (tableStatus === "FINISH" && betRecord.betMoney > 0) {
      setRecords(() => [betRecord, ...records]);
      setBetRecord({
        betMoney: 0,
        point: 0,
        profit: 0,
        winMoney: 0,
      });
    }
  }, [tableStatus, betRecord.betMoney]);

  const handleBetBtn = () => {
    setIsBet(true);
    socket?.emit("/user/rocket/rocketHandler/bet", {
      game: "rocket",
      accountID: localStorage.getItem("accountID"),
      session: localStorage.getItem("token"),
      amount: 10,
    });
    setBetRecord({
      betMoney: betRecord.betMoney + 10,
      point: 0,
      profit: betRecord.profit - 10,
      winMoney: 0,
    });
  };

  const handleEscape = () => {
    setIsBet(false);
    socket?.emit("/user/rocket/rocketHandler/escape", {
      game: "rocket",
      accountID: localStorage.getItem("accountID"),
      session: localStorage.getItem("token"),
    });
  };

  if (!socket) {
    return null;
  }
  return (
    <Stack align="center">
      <Box
        style={{
          width: "100%",
        }}
      ></Box>
      {tableStatus === "READY" && <IconRocketOff size={150} />}

      {tableStatus === "GAMING" && <IconRocket size={150} />}

      {tableStatus === "FINISH" && <IconSparkles size={150} />}
      <Group>
        {tableStatus === "READY" && (
          <Stack align="center">
            <Title>准备中...</Title>
            <p>{(7 - ticks / 10 || 0.1).toFixed(1)}s</p>
          </Stack>
        )}
        {tableStatus === "GAMING" && (
          <Stack align="center">
            <Title>飞行中...</Title>
            <p>{(0.96 * Math.exp(0.05 * (1 + ticks / 10))).toFixed(2)}X</p>
          </Stack>
        )}
        {tableStatus === "FINISH" && (
          <Stack align="center">
            <Title>已爆炸，结算中...</Title>
            <p>{(3 - ticks / 10 || 0.1).toFixed(1)}s</p>
          </Stack>
        )}
      </Group>
      <Group>
        {isBet && (
          <Button onClick={handleEscape} disabled={tableStatus !== "GAMING"}>
            结算
          </Button>
        )}

        <Button onClick={handleBetBtn} disabled={tableStatus !== "READY"}>
          乘坐($10)
        </Button>
      </Group>
      <Group>
        <Text>当前</Text>
        <Text>下注：{betRecord.betMoney || 0}</Text>
        <Text>回款: {betRecord.winMoney || 0} </Text>
        <Text>倍数: {betRecord.point || 0} </Text>
        <Text>盈利: {betRecord.profit || 0} </Text>
      </Group>
      <Title>下注记录</Title>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>下注</Table.Th>
            <Table.Th>回款</Table.Th>
            <Table.Th>盈利</Table.Th>
            <Table.Th>倍数</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {records.map((record, index) => (
            <Table.Tr key={index}>
              <Table.Td>{record.betMoney}</Table.Td>
              <Table.Td>{record.winMoney}</Table.Td>
              <Table.Td>{record.profit}</Table.Td>
              <Table.Td>{record.point}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  );
}
