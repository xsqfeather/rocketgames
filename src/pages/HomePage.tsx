import { Button, Card, CardContent, Stack, Typography } from "@mui/joy";
import { useContext, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SnackbarContext } from "../contexts/SnackbarContext";
import { GlobalMaskLoaderContext } from "../contexts/GlobalMaskLoaderContext";
import { SocketContext } from "../contexts/SocketContext";

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const loginSuccess = searchParams.get("loginSuccess");
  const registerSuccess = searchParams.get("registerSuccess");
  const { showNotify } = useContext(SnackbarContext);
  const { showMaskLoader } = useContext(GlobalMaskLoaderContext);
  const socket = useContext(SocketContext);
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
        <Card
          variant="outlined"
          sx={{
            textDecoration: "none",
          }}
          component={Link}
          to={"/games/rocket"}
        >
          <CardContent>
            <Typography level="title-md">Rocket</Typography>
            <Typography>Escape from Rocket by winning Chips</Typography>
          </CardContent>
        </Card>
        <Card
          variant="outlined"
          sx={{
            textDecoration: "none",
          }}
          component={Button}
          onClick={() => {
            showMaskLoader({
              message: "Loading...",
            });
          }}
        >
          <CardContent>
            <Typography level="title-md">Rocket</Typography>
            <Typography>
              Escape From the Dangerous Rocket With Winning Chips!
            </Typography>
          </CardContent>
        </Card>
        <Card
          variant="outlined"
          sx={{
            textDecoration: "none",
          }}
          component={Button}
          onClick={() => {
            socket?.emit("/user/lobby/lobbyHandler/gameList");
          }}
        >
          <CardContent>
            <Typography level="title-md">Rocket</Typography>
            <Typography>Escape from Rocket by winning Chips</Typography>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
}
