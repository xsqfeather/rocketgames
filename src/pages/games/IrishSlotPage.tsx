import { Button, Card, CircularProgress, Stack } from "@mui/joy";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import { Link } from "react-router-dom";

export default function IrishSlotPage() {
  const socket = useContext(SocketContext);
  const [login, setLogin] = useState(false);
  const [results, setResults] = useState<any[][]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prizeIcons, setPrizeIcons] = useState<any[][]>([]);
  const [noPrize, setNoPrize] = useState(true);
  const [sloting, setSloting] = useState(false);

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
        resolve(rlt);
      });
    });
  };
  const toSlot = () => {
    socket?.emit("/user/irishslot/irishslotHandler/slot", {
      seq: "1",
      game: "irishslot",
      accountID: localStorage.getItem("accountID"),
      session: localStorage.getItem("token"),
      testingRound: 100000,
    });

    return new Promise((resolve, _reject) => {
      socket?.on("/user/irishslot/irishslotHandler/slot", (rlt: any) => {
        resolve(rlt);
      });
    });
  };

  useEffect(() => {
    if (socket) {
      toLogin().then((rlt: any) => {
        if (rlt.code === 200) {
          setResults(rlt.data.results);
          setLogin(true);
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    if (results[currentIndex]) {
      setNoPrize(false);
      console.log(" setCurrentIndex(currentIndex + 1);");
      if (!results[currentIndex + 1]) {
        setNoPrize(true);
      }
      setTimeout(() => {
        console.log("开始检查下一个");
        if (results[currentIndex + 1]) {
          setCurrentIndex(currentIndex + 1);
        } else {
          setNoPrize(true);
        }
      }, 3000);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  }, [results[currentIndex]]);

  useEffect(() => {
    if (currentIndex < 0) {
      setCurrentIndex(0);
    }
  }, [currentIndex]);

  console.log({ login, sloting });

  if (!login) {
    return (
      <Stack alignItems={"center"} gap={5}>
        <CircularProgress />
      </Stack>
    );
  }

  const prizeIconsOne = prizeIcons ? prizeIcons[currentIndex] : [];

  return (
    <Stack alignItems={"center"} gap={5}>
      {sloting && <CircularProgress />}
      <Stack direction={"row"} flexWrap={"nowrap"}>
        {results[currentIndex]?.map((r, i) => {
          return (
            <Stack
              sx={{
                wordBreak: "break-all",
                textAlign: "center",
              }}
              key={i}
              alignItems={"center"}
            >
              {r.map((icon: any, index: number) => {
                return (
                  <Card
                    sx={{
                      width: "4rem",
                      height: `${icon.span * 4}rem`,
                      display: "flex",
                      justifyItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      borderColor: icon.borderColor,
                      borderStyle: icon.borderColor ? "outset" : "dashed",
                      borderWidth: icon.borderColor ? 2 : 1,
                      backgroundColor: prizeIconsOne?.includes(icon.icon)
                        ? "#ef420ad4"
                        : "inherit",
                    }}
                    key={index}
                  >
                    {icon.icon}
                  </Card>
                );
              })}
            </Stack>
          );
        })}
      </Stack>
      <Button
        onClick={async () => {
          setSloting(true);
          setCurrentIndex(0);
          const rlt: any = await toSlot();
          setCurrentIndex(0);
          const data = rlt.data;
          const results = data.results;
          console.log("摇奖结果========", rlt.data);
          setPrizeIcons(rlt.data.prizeIcons);
          setResults(results);
          setSloting(false);
        }}
        disabled={!noPrize}
      >
        Slot One
      </Button>
      <Link to="/games/irishslot/test">去测试</Link>
    </Stack>
  );
}
