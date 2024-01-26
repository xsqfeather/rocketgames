import { IconRocket, IconRocketOff, IconSparkles } from "@tabler/icons-react";
import useRocketGame from "../../hooks/useRocketGame";
import { Button, Stack, Typography } from "@mui/joy";

export default function RocketPage() {
  const {
    tableStatus,
    cashOutPoint,
    ticks,
    isBets,
    handleBetBtn,
    handleEscape,
    records,
  } = useRocketGame();

  return (
    <Stack alignItems={"center"} gap={5}>
      {tableStatus === "READY" && <IconRocketOff size={150} />}

      {tableStatus === "GAMING" && <IconRocket size={150} />}

      {tableStatus === "FINISH" && <IconSparkles size={150} />}
      {tableStatus === "READY" && (
        <Stack>
          <Typography>Preparing...</Typography>
          <p>{(7 - ticks / 10 || 0.1).toFixed(1)}s</p>
        </Stack>
      )}
      {tableStatus === "GAMING" && (
        <Stack>
          <Typography>Flying...</Typography>
          <p>{cashOutPoint.toFixed(2)}X</p>
        </Stack>
      )}
      {tableStatus === "FINISH" && (
        <Stack>
          <Typography>Boom...</Typography>
          <p>{(3 - ticks / 10 || 0.1).toFixed(1)}s</p>
        </Stack>
      )}
      <Stack
        direction={"row"}
        justifyContent={"space-around"}
        sx={{
          width: "100%",
        }}
      >
        <Button
          onClick={() => handleEscape(1)}
          disabled={tableStatus !== "GAMING" || !isBets[0]}
        >
          Cash Out-1
        </Button>
        <Button
          onClick={() => handleBetBtn(1)}
          disabled={tableStatus !== "READY" || isBets[0]}
        >
          On Board ($10)-1
        </Button>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"space-around"}
        sx={{
          width: "100%",
        }}
      >
        <Button
          onClick={() => handleEscape(2)}
          disabled={tableStatus !== "GAMING" || !isBets[1]}
        >
          Cash Out-2
        </Button>
        <Button
          onClick={() => handleBetBtn(2)}
          disabled={tableStatus !== "READY" || isBets[1]}
        >
          On Board ($10)-2
        </Button>
      </Stack>

      <Typography>Player Records:</Typography>
      {records?.map((record, index) => (
        <Stack
          key={index}
          direction={"row"}
          justifyContent={"space-around"}
          sx={{
            width: "100%",
          }}
        >
          <Typography>{record.firstName || 0}</Typography>
          <Typography>Chips：{(record.chips || 0).toFixed(2)}</Typography>
          <Typography>
            Win Chips: {(record.winChips || 0).toFixed(2)}
          </Typography>
          <Typography>
            Cash Point: {(record.chipPoint || 0).toFixed(2)}{" "}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
