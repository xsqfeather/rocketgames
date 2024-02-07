import { Box, Breadcrumbs, Input, Link, Typography } from "@mui/joy";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useList } from "../hooks/restful";
import GameRecordTable from "../components/GameRecordTable";
import GameRecordList from "../components/GameRecordList";
import Prisma from "@prisma/client";
import { useEffect, useState } from "react";

export default function GameRecordPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState();
  const { data, error } = useList<Prisma.GameRecord>("my/game-records", {
    filter: {
      q: search as unknown as string,
    },
    pagination: { page },
  });
  const nav = useNavigate();

  useEffect(() => {
    if (error) {
      nav("/auth/login");
    }
  }, [error]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  if (error) {
    return null;
  }

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
      <Input
        value={search}
        onChange={(e: any) => {
          setSearch(e.target.value);
        }}
        placeholder="Search"
      />
      {data && (
        <GameRecordTable
          rows={data.list}
          handlePageChange={handlePageChange}
          page={page}
        />
      )}
      {data && (
        <GameRecordList
          totalPage={Math.ceil(data.total / 10)}
          handlePageChange={handlePageChange}
          page={page}
          listItems={data.list}
        />
      )}
    </>
  );
}
