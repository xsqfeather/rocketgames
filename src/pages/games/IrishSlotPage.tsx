import {
  Avatar,
  Button,
  CircularProgress,
  Stack,
  Typography,
  Sheet,
  Select,
  Option,
  FormLabel,
  Box,
  List,
  ListItem,
} from "@mui/joy";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";

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

  const [gameChips, setGameChips] = useState(0);

  const [betAmount, setBetAmount] = useState(0.1);
  const [betRate, setBetRate] = useState(1);

  const [winPrizes, setWinPrizes] = useState<number[]>([]);

  const handleChange = (_event: any, newValue: any) => {
    setBetAmount(newValue);
  };

  const handleRateChange = (_event: any, newValue: any) => {
    setBetRate(newValue);
  };

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
    const input = {
      seq: "1",
      game: "irishslot",
      accountID: localStorage.getItem("accountID"),
      session: localStorage.getItem("token"),
    };
    console.log("input: /user/irishslot/irishslotHandler/joinGame", input);
    socket?.emit("/user/irishslot/irishslotHandler/joinGame", input);

    return new Promise((resolve, _reject) => {
      socket?.on("/user/irishslot/irishslotHandler/joinGame", (rlt) => {
        console.log("output: /user/irishslot/irishslotHandler/joinGame", rlt);
        resolve(rlt);
      });
    });
  };
  const toSlot = () => {
    const input = {
      seq: "1",
      game: "irishslot",
      accountID: localStorage.getItem("accountID"),
      session: localStorage.getItem("token"),
      betAmount,
      betRate,
    };
    console.log("input: /user/irishslot/irishslotHandler/slot", input);
    socket?.emit("/user/irishslot/irishslotHandler/slot", input);

    return new Promise((resolve, _reject) => {
      socket?.on("/user/irishslot/irishslotHandler/slot", (rlt: any) => {
        console.log("output: /user/irishslot/irishslotHandler/slot", rlt);
        resolve(rlt);
      });
    });
  };

  useEffect(() => {
    if (socket) {
      toLogin().then((rlt: any) => {
        if (rlt.code === 200) {
          setResults(rlt.data.results);
          setGameChips(rlt.data.updatedUserChips);
          setLogin(true);
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    socket?.on("/ind/lobby/balance/updated", (data: any) => {
      console.log("/ind/lobby/balance/updated", data);
      setGameChips(data.gameChips);
    });
    return () => {
      socket?.off("/ind/lobby/balance/updated");
    };
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
              <List>
                {Object.keys(playerPrizeCheckTimes[currentIndex] || {}).map(
                  (key) => {
                    return (
                      <ListItem>
                        <Typography>{key}:</Typography>
                        {playerPrizeCheckTimes[currentIndex][key as any].map(
                          (times: any, index: number) => {
                            const checkTimes =
                              playerPrizeCheckTimes[currentIndex];
                            return (
                              <>
                                <Typography>
                                  {times}
                                  {index <
                                    checkTimes[key as any].length - 1 && (
                                    <IconX size={"10px"} />
                                  )}
                                </Typography>
                              </>
                            );
                          }
                        )}
                        {playerPrizeCheckTimes[currentIndex][key as any].reduce(
                          (a: number, b: number) => a * b
                        )}
                      </ListItem>
                    );
                  }
                )}
              </List>
              {winPrizes[currentIndex] && (
                <Typography>Win: {winPrizes[currentIndex]}</Typography>
              )}
            </Stack>
          );
        })}
      </Stack>
      <Typography>GameChips: {gameChips}</Typography>
      <Stack
        direction={"row"}
        justifyContent={"space-around"}
        sx={{
          width: "100%",
        }}
      >
        <Box>
          <FormLabel>Bet Amount:</FormLabel>
          <Select value={String(betAmount)} onChange={handleChange}>
            <Option value="0.1">0.1</Option>
            <Option value="0.2">0.2</Option>
            <Option value="0.3">0.3</Option>
            <Option value="0.4">0.4</Option>
            <Option value="0.5">0.5</Option>
            <Option value="0.6">0.6</Option>
            <Option value="0.7">0.7</Option>
            <Option value="0.8">0.8</Option>
            <Option value="0.9">0.9</Option>
          </Select>
        </Box>
        <Box>
          <FormLabel>Bet Rate:</FormLabel>
          <Select value={String(betRate)} onChange={handleRateChange}>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
            <Option value="6">6</Option>
            <Option value="7">7</Option>
            <Option value="8">8</Option>
            <Option value="9">9</Option>
            <Option value="10">10</Option>
          </Select>
        </Box>
        <Box>
          <FormLabel>Base Bet:</FormLabel>
          <Typography>20</Typography>
        </Box>
        <Box>
          <FormLabel>Total Bet</FormLabel>
          <Typography>{betAmount * betRate * 20}</Typography>
        </Box>
      </Stack>
      <Button
        onClick={async () => {
          setSloting(true);
          const rlt: any = await toSlot();
          const data = rlt.data;
          const results = data.results;
          const playerPrizeCheckTimes = data.playerPrizeCheckTimes;
          const columnsHasPrize = data.columnsHasPrize;
          setPlayerPrizeCheckTimes(playerPrizeCheckTimes);
          setColumnsHasPrize(columnsHasPrize);
          setResults(results);
          setSloting(false);
          setWinPrizes(data.winPrizes);
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
