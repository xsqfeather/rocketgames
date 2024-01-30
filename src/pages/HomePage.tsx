import { Card, CardContent, Stack, Typography } from "@mui/joy";
import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SnackbarContext } from "../contexts/SnackbarContext";
import { SocketContext } from "../contexts/SocketContext";

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const loginSuccess = searchParams.get("loginSuccess");
  const registerSuccess = searchParams.get("registerSuccess");
  const { showNotify } = useContext(SnackbarContext);
  const socket = useContext(SocketContext);
  const [games, setGames] = useState<string[]>([]);
  useEffect(() => {
    if (loginSuccess) {
      showNotify({
        message: "Login Success! 🤥",
      });
    }
  }, [loginSuccess]);

  useEffect(() => {
    if (registerSuccess) {
      showNotify({
        message: "Register Success! 🤥",
      });
    }
  }, [registerSuccess]);

  useEffect(() => {
    if (socket) {
      socket.emit("/user/lobby/lobbyHandler/gameList", {
        seq: "1",
        accountID: localStorage.getItem("accountID"),
        session: localStorage.getItem("token"),
      });
    }
  }, [socket]);
  useEffect(() => {
    if (socket) {
      socket.on("/user/lobby/lobbyHandler/gameList", (data: any) => {
        console.log("/user/lobby/lobbyHandler/gameList", data);
        setGames(data.data);
      });
    }
  }, [socket]);
  return (
    <Stack gap={3}>
      <Typography>Games</Typography>
      <Stack
        direction="row"
        gap={2}
        sx={{ mb: 2 }}
        justifyContent={"space-around"}
      >
        {games.map((game: string) => (
          <Card
            variant="outlined"
            sx={{
              textDecoration: "none",
            }}
            component={Link}
            to={`/games/${game}`}
          >
            <CardContent>
              <Typography level="title-md">
                {game.toLocaleUpperCase()}
              </Typography>
              <Typography>game description</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
