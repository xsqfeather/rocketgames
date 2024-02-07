import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/joy";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Link as RouterLink } from "react-router-dom";
import { useList } from "../hooks/restful";
import Prisma from "@prisma/client";

export default function BillingPage() {
  const { data, error } = useList<Prisma.BalanceLog>("my/balance-logs", {
    pagination: { page: 1 },
  });

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
            My Billing
          </Typography>
        </Breadcrumbs>
      </Box>
      <Stack alignContent={"center"} alignItems={"center"} gap={3}>
        <Typography level="h2" component="h1">
          My Billing
        </Typography>
        <Typography level="h3" component="h1">
          Total Pay: ${(data as any)?.totalOut}
        </Typography>

        <Typography level="h3" component="h1">
          Total Income: ${(data as any)?.totalIn}
        </Typography>
      </Stack>
    </>
  );
}
