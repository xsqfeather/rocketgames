import { Box, Breadcrumbs, Link, Typography } from "@mui/joy";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Link as RouterLink } from "react-router-dom";
import { useList } from "../hooks/restful";
import GameRecordTable from "../components/GameRecordTable";
import GameRecordList from "../components/GameRecordList";

export default function GameRecordPage() {
  const { data } = useList("my/game-records");
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
            Game Records
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
          My Game Records
        </Typography>
      </Box>
      {data && <GameRecordTable rows={(data as any).list} />}
      {data && <GameRecordList listItems={(data as any).list} />}
    </>
  );
}
