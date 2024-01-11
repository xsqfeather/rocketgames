import { Box, Breadcrumbs, Link, Typography } from "@mui/joy";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Link as RouterLink } from "react-router-dom";
import { useList } from "../hooks/restful";
import Prisma from "@prisma/client";
import { useState } from "react";
import GameReplayTable from "../components/GameReplayTable";
import GameReplayList from "../components/GameReplayList";

export default function GameRecordPage() {
  const [page, setPage] = useState(1);
  const { data } = useList<Prisma.PlayerActionGameLog>(
    "my/player-action-game-logs",
    {
      pagination: { page },
    }
  );

  const handlePageChange = (page: number) => {
    setPage(page);
  };

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
            My Game Action Logs
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
          My Game Action Logs
        </Typography>
      </Box>
      {data && (
        <GameReplayTable
          rows={data.list}
          handlePageChange={handlePageChange}
          page={page}
        />
      )}
      {data && (
        <GameReplayList
          totalPage={Math.ceil(data.total / 10)}
          handlePageChange={handlePageChange}
          page={page}
          listItems={data.list}
        />
      )}
    </>
  );
}
