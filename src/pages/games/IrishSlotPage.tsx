import {
  Avatar,
  Button,
  CircularProgress,
  Stack,
  Typography,
  Sheet,
} from "@mui/joy";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

let timer: any = null;

export default function IrishSlotPage() {
  const socket = useContext(SocketContext);
  const [login, setLogin] = useState(false);
  const [results, setResults] = useState<any[][]>([]);
  const [playerPrizeCheckTimes, setPlayerPrizeCheckTimes] = useState<any[][]>(
    []
  );
  const [sloting, setSloting] = useState(false);

  const [currentSlotIndex, setCurrentSlotIndex] = useState(0);

  const [columnsHasPrize, setColumnsHasPrize] = useState<any[]>([]);

  useEffect(() => {
    if (results.length > 1 && results[currentSlotIndex + 1]) {
      timer = setTimeout(() => {
        setCurrentSlotIndex(currentSlotIndex + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [results, currentSlotIndex]);

  // useEffect(() => {
  //   if (results[currentSlotIndex] && !sloting) {
  //     setCurrentSlot(results[currentSlotIndex]);
  //   }
  // }, [currentSlotIndex, results, !sloting]);

  const toLogin = () => {
    socket?.emit("/user/irishslot/irishslotHandler/joinGame", {
      seq: "1",
      game: "irishslot",
      accountID: localStorage.getItem("accountID"),
      session: localStorage.getItem("token"),
      testingRound: 100000,
    });

    return new Promise((resolve, _reject) => {
      socket?.on("/user/irishslot/irishslotHandler/joinGame", (rlt) => {
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
          const checkTimes = playerPrizeCheckTimes
            ? playerPrizeCheckTimes[currentIndex]
            : [];

          const hasPrize = columnsHasPrize ? columnsHasPrize[currentIndex] : [];

          return (
            <Stack justifyContent={"center"} alignItems={"center"}>
              <Typography level="h2">第{currentIndex + 1}次</Typography>
              <Stack key={currentIndex} direction={"row"} flexWrap={"nowrap"}>
                {rlt?.map((r, i) => {
                  const columnHasPrize = hasPrize ? hasPrize[i] : false;
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
                        const checkPrizes = checkTimes
                          ? checkTimes[icon.icon]
                          : [];
                        let isPrize = checkPrizes ? checkPrizes[i] > 0 : false;

                        return (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.3,
                              ease: [0, 0.71, 0.2, 1.01],
                              scale: {
                                type: "tween",
                                damping: 5,
                                stiffness: 100,
                                restDelta: 0.001,
                              },
                            }}
                          >
                            <Sheet
                              sx={{
                                width: "4rem",
                                height: `${icon.span * 4}rem`,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                borderColor: icon.borderColor,
                                borderStyle: icon.borderColor
                                  ? "outset"
                                  : "dashed",
                                borderWidth: icon.borderColor ? 5 : 3,
                                backgroundColor:
                                  isPrize ||
                                  (columnHasPrize && icon.icon === "wild")
                                    ? "#ef420ad4"
                                    : "inherit",
                              }}
                              key={index}
                            >
                              <Avatar
                                sx={{
                                  width: "3rem",
                                  height: "3rem",
                                }}
                                alt={`${icon.icon}-${icon.span}`}
                                src={`/slot_icons/icon_${icon.imgNumber}_${icon.span}.png`}
                              />
                            </Sheet>
                          </motion.div>
                        );
                      })}
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
          );
        })}
      </Stack>

      <Button
        onClick={async () => {
          setSloting(true);
          const rlt: any = await toSlot();
          console.log("slot结果", { rlt });
          const data = rlt.data;
          const results = data.results;
          const playerPrizeCheckTimes = data.playerPrizeCheckTimes;
          const columnsHasPrize = data.columnsHasPrize;
          setPlayerPrizeCheckTimes(playerPrizeCheckTimes);
          setColumnsHasPrize(columnsHasPrize);
          // setPrizeIcons(rlt.data.prizeIcons);
          setResults(results);
          setSloting(false);
          setCurrentSlotIndex(0);
          clearTimeout(timer);
        }}
      >
        Slot One
      </Button>
      <Link to="/games/irishslot/test">去测试</Link>
    </Stack>
  );
}
