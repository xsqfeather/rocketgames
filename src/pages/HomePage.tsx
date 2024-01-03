import { Button, Card, CardContent, Stack, Typography } from "@mui/joy";
import { useContext, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SnackbarContext } from "../contexts/SnackbarContext";
import { GlobalMaskLoaderContext } from "../contexts/GlobalMaskLoaderContext";

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const loginSuccess = searchParams.get("loginSuccess");
  const registerSuccess = searchParams.get("registerSuccess");
  const { showNotify } = useContext(SnackbarContext);
  const { showMaskLoader } = useContext(GlobalMaskLoaderContext);
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
            <Typography>Escape from Rocket by winning Chips</Typography>
          </CardContent>
        </Card>
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
      </Stack>
    </Stack>
  );
}
