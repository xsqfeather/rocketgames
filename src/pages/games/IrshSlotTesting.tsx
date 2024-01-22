import { Button, CircularProgress, Stack, Table, Typography } from "@mui/joy";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import { SlotGameWeight, SlotPayRate } from "@prisma/client";
import { EditWeightWin } from "../../components/EditWeightWin";
import { EditRateWin } from "../../components/EditRateWin";
import { GlobalMaskLoaderContext } from "../../contexts/GlobalMaskLoaderContext";

export default function IrishSlotTestPage() {
  const socket = useContext(SocketContext);
  const [weights, setWeights] = useState<SlotGameWeight[]>([]);
  const [rates, setRates] = useState<SlotPayRate[]>([]);
  const [login, setLogin] = useState(false);
  const [testingTotalWin, setTestingTotalWin] = useState(0);
  const [testingTotalBet, setTestingTotalBet] = useState(0);
  const [iconsCount, setIconsCount] = useState<any[]>([]);
  const [iconWinCount, setIconWinCount] = useState<any[]>([]);

  const { showMaskLoader, closeMaskLoader } = useContext(
    GlobalMaskLoaderContext
  );

  const getConfigs = () => {
    socket?.emit("/user/irishslot/irishslotHandler/getConfigs", {
      seq: "1",
      game: "irishslot",
      accountID: localStorage.getItem("accountID"),
      session: localStorage.getItem("token"),
    });

    return new Promise((resolve, _reject) => {
      socket?.on("/user/irishslot/irishslotHandler/getConfigs", (rlt) => {
        resolve(rlt);
      });
    });
  };
  const toLogin = () => {
    socket?.emit("/user/irishslot/irishslotHandler/join", {
      seq: "1",
      game: "irishslot",
      accountID: localStorage.getItem("accountID"),
      session: localStorage.getItem("token"),
      testingRound: 100000,
    });

    return new Promise((resolve, _reject) => {
      socket?.on("/user/irishslot/irishslotHandler/join", (rlt) => {
        console.log("/user/irishslot/irishslotHandler/join", { rlt });
        resolve(rlt);
      });
    });
  };
  const beginTest = () => {
    socket?.emit("/user/irishslot/irishslotHandler/beginTest", {
      seq: "1",
      game: "irishslot",
      accountID: localStorage.getItem("accountID"),
      session: localStorage.getItem("token"),
      testingRound: 100000,
    });

    return new Promise((resolve, _reject) => {
      socket?.on("/user/irishslot/irishslotHandler/beginTest", (rlt) => {
        resolve(rlt);
      });
    });
  };

  useEffect(() => {
    if (socket) {
      toLogin().then((rlt: any) => {
        const data = rlt.data;
        console.log("=======", { data });
        setLogin(true);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket && login) {
      getConfigs().then((rlt: any) => {
        const data = rlt.data;
        console.log("configs", data);
        setWeights(data.weights);
        setRates(data.rates);
      });
    }
  }, [socket, login]);

  useEffect(() => {
    if (socket) {
      socket.on("/ind/irishslot/testing/status", (data) => {
        console.log("/ind/irishslot/testing/status", { data });
        showMaskLoader({
          message: `开始测试 ${data.times}/100000`,
        });
        setIconsCount(data.iconsCount);
        setIconWinCount(data.iconWinCount);

        if (data.times === 100000) {
          setTestingTotalWin(data.totalWin);
          setTestingTotalBet(data.totalBet);
          closeMaskLoader({
            message: `测试结束`,
          });
        }
      });
    }
  }, [socket]);

  if (!login) {
    return <CircularProgress />;
  }

  console.log({ iconsCount });
  return (
    <Stack alignItems={"center"} gap={5}>
      <Typography>权重</Typography>
      <Table aria-label="basic table">
        <thead>
          <tr>
            <th>Icon</th>
            <th>Column</th>
            <th>Weight</th>
            <th>修改</th>
          </tr>
        </thead>
        <tbody>
          {weights.map((weight) => (
            <tr key={weight.id}>
              <td>{weight.icon}</td>
              <td>{weight.columnNumber}</td>
              <td>{weight.weight}</td>
              <td>
                <EditWeightWin
                  icon={weight.icon}
                  column={weight.columnNumber}
                  weight={weight.weight}
                  onSuccess={() => {
                    getConfigs().then((rlt: any) => {
                      const data = rlt.data;
                      setWeights(data.weights);
                      setRates(data.rates);
                    });
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Typography>赔率</Typography>
      <Table aria-label="basic table">
        <thead>
          <tr>
            <th>Icon</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>修改</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate) => (
            <tr key={rate.id}>
              <td>{rate.icon}</td>
              <td>{(rate.rate as any) ? (rate.rate as any)[2] : 0}</td>
              <td>{(rate.rate as any) ? (rate.rate as any)[3] : 0}</td>
              <td>{(rate.rate as any) ? (rate.rate as any)[4] : 0}</td>
              <td>{(rate.rate as any) ? (rate.rate as any)[5] : 0}</td>
              <td>
                <EditRateWin
                  icon={rate.icon}
                  rates={rate.rate as number[]}
                  onSuccess={() => {
                    getConfigs().then((rlt: any) => {
                      const data = rlt.data;
                      setWeights(data.weights);
                      setRates(data.rates);
                    });
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button
        onClick={async () => {
          showMaskLoader({
            message: "开始测试",
          });
          const rlt = await beginTest();

          console.log({ rlt });
        }}
      >
        模拟测试(10W)
      </Button>

      <Stack direction={"row"} gap={2}>
        <Typography>总盈利：</Typography>
        <Typography>{testingTotalWin}</Typography>
        <Typography>总投注：</Typography>
        <Typography>{testingTotalBet}</Typography>
        <Typography>RTP:</Typography>
        <Typography>
          {testingTotalBet ? testingTotalWin / testingTotalBet : 0}
        </Typography>
      </Stack>
      <Typography>图标连线出现次数统计</Typography>
      <Table aria-label="basic table">
        <thead>
          <tr>
            <th>Icon</th>
            <th>6</th>
            <th>5</th>
            <th>4</th>
            <th>3</th>
            <th>2</th>
            <th>1</th>
          </tr>
        </thead>
        <tbody>
          {iconsCount
            ?.filter((i) => i.icon !== "wild" && i.icon !== "scatter")
            ?.map((r) => {
              return (
                <tr key={r.icon}>
                  <td>{r.icon}</td>
                  <td>{r.count6}</td>
                  <td>{r.count5}</td>
                  <td>{r.count4}</td>
                  <td>{r.count3}</td>
                  <td>{r.count2}</td>
                  <td>{r.count1}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <Typography>图标中奖出现次数统计</Typography>
      <Table aria-label="basic table">
        <thead>
          <tr>
            <th>Icon</th>
            <th>6</th>
            <th>5</th>
            <th>4</th>
            <th>3</th>
            <th>2</th>
            <th>1</th>
          </tr>
        </thead>
        <tbody>
          {iconWinCount
            ?.filter((i) => i.icon !== "wild" && i.icon !== "scatter")
            ?.map((r) => {
              return (
                <tr key={r.icon}>
                  <td>{r.icon}</td>
                  <td>{r.count6}</td>
                  <td>{r.count5}</td>
                  <td>{r.count4}</td>
                  <td>{r.count3}</td>
                  <td>{r.count2}</td>
                  <td>{r.count1}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Stack>
  );
}
