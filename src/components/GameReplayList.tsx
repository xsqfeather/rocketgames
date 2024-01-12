/* eslint-disable jsx-a11y/anchor-is-valid */
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListDivider from "@mui/joy/ListDivider";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import moment from "moment";
import { PlayerActionGameLog } from "@prisma/client";
import CheckActionLogWin from "./CheckActionLogWin";

export default function GameReplayList(props: {
  listItems: PlayerActionGameLog[];
  page: number;
  totalPage: number;
  handlePageChange: (page: number) => void;
}) {
  const { listItems, page, handlePageChange, totalPage } = props;
  return (
    <Box sx={{ display: { xs: "block", sm: "none" } }}>
      <List
        size="sm"
        sx={{
          "--ListItem-paddingX": 0,
          textAlign: "center",
        }}
      >
        <ListItem
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <ListItemContent
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "start",
              justifyContent: "space-between",
            }}
          >
            <Typography level="body-sm">Game</Typography>
            <Typography level="body-sm" color="neutral">
              Action Logs
            </Typography>
            <Typography level="body-sm" color="neutral">
              Seat
            </Typography>
            <Typography level="body-sm" color="neutral">
              Round
            </Typography>
            <Typography level="body-sm" color="neutral">
              Time
            </Typography>
          </ListItemContent>
        </ListItem>
        <ListDivider />
      </List>
      {listItems.map((listItem) => (
        <List
          key={listItem.id}
          size="sm"
          sx={{
            "--ListItem-paddingX": 0,
            textAlign: "center",
          }}
        >
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <ListItemContent
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "start",
                justifyContent: "space-between",
              }}
            >
              <Typography level="body-sm">{listItem.gameName}</Typography>
              <CheckActionLogWin
                logId={listItem.logId}
                game={listItem.gameName}
              />
              <Typography level="body-sm" color="neutral">
                {listItem.seat}
              </Typography>
              <Typography level="body-sm" color="neutral">
                {listItem.round}
              </Typography>
              <Typography level="body-sm" color="neutral">
                {moment(listItem.createdAt).fromNow()}
              </Typography>
            </ListItemContent>
          </ListItem>
          <ListDivider />
        </List>
      ))}
      <Box
        className="Pagination-mobile"
        sx={{
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          py: 2,
        }}
      >
        <IconButton
          aria-label="previous page"
          variant="outlined"
          color="neutral"
          size="sm"
          disabled={page === 1}
          onClick={
            page === 1
              ? () => {}
              : () => {
                  handlePageChange(page - 1);
                }
          }
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Typography level="body-sm" mx="auto">
          Page {page} of {totalPage}
        </Typography>
        <IconButton
          aria-label="next page"
          variant="outlined"
          color="neutral"
          size="sm"
          disabled={page === totalPage}
          onClick={
            page === totalPage
              ? () => {}
              : () => {
                  handlePageChange(page + 1);
                }
          }
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
