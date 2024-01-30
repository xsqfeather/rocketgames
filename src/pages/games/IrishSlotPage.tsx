import { Button, Card, CircularProgress, Stack, Typography } from "@mui/joy";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import { Link } from "react-router-dom";

export default function IrishSlotPage() {
  const socket = useContext(SocketContext);
  const [login, setLogin] = useState(false);
  const [results, setResults] = useState<any[][]>([]);
  const [prizeIcons, setPrizeIcons] = useState<any[][]>([]);
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

  console.log({ login, sloting });

  if (!login) {
    return (
      <Stack alignItems={"center"} gap={5}>
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Stack alignItems={"center"} gap={5}>
      {sloting && <CircularProgress />}
      <Stack
        direction={"row"}
        flexWrap={"nowrap"}
        justifyContent={"left"}
        gap={2}
        sx={{
          width: "100%",
          overflowX: "scroll",
        }}
      >
        {results.map((rlt, currentIndex) => {
          const prizeIconsOne = prizeIcons ? prizeIcons[currentIndex] : [];
          return (
            <>
              {" "}
              <Typography>第{currentIndex + 1}次</Typography>
              <Stack key={currentIndex} direction={"row"} flexWrap={"nowrap"}>
                {rlt?.map((r, i) => {
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
                              borderStyle: icon.borderColor
                                ? "outset"
                                : "dashed",
                              borderWidth: icon.borderColor ? 5 : 3,
                              backgroundColor: prizeIconsOne?.includes(
                                icon.icon
                              )
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
            </>
          );
        })}
      </Stack>

      <Button
        onClick={async () => {
          setSloting(true);
          const rlt: any = await toSlot();
          const data = rlt.data;
          const results = data.results;
          setPrizeIcons(rlt.data.prizeIcons);
          setResults(results);
          setSloting(false);
        }}
      >
        Slot One
      </Button>
      <Link to="/games/irishslot/test">去测试</Link>
    </Stack>
  );
}
