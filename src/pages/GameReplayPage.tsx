import { Box, Breadcrumbs, Button, Link, Typography } from "@mui/joy";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import OrderTable from "../components/OrderTable";
import OrderList from "../components/OrderList";
import { Link as RouterLink } from "react-router-dom";

export default function GameReplayPage() {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Breadcrumbs
          size="sm"
          aria-label="breadcrumbs"
          separator={<ChevronRightRoundedIcon fontSize="medium" />}
          sx={{ pl: 0 }}
        >
          <Link
            underline="none"
            color="neutral"
            component={RouterLink}
            to="/"
            aria-label="Home"
          >
            <HomeRoundedIcon />
          </Link>
          <Link
            underline="hover"
            color="neutral"
            component={RouterLink}
            to="/"
            fontSize={12}
            fontWeight={500}
          >
            Lobby
          </Link>
          <Typography color="primary" fontWeight={500} fontSize={12}>
            Game Replays
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          display: "flex",
          mb: 1,
          gap: 1,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "start", sm: "center" },
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h2" component="h1">
          My Game Replays
        </Typography>
        <Button
          color="primary"
          startDecorator={<DownloadRoundedIcon />}
          size="sm"
        >
          Download PDF
        </Button>
      </Box>
      <OrderTable />
      <OrderList />
    </>
  );
}
