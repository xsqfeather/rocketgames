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

export default function GameRecordList(props: { listItems: any[] }) {
  const { listItems } = props;
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
              Game Chips
            </Typography>
            <Typography level="body-sm" color="neutral">
              Win Chips
            </Typography>
            <Typography level="body-sm" color="neutral">
              Chip Point
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
              <Typography level="body-sm" color="neutral">
                {listItem.chips.toFixed(2)}
              </Typography>
              <Typography level="body-sm" color="neutral">
                {listItem.winChips.toFixed(2)}
              </Typography>
              <Typography level="body-sm" color="neutral">
                {listItem.chipPoint.toFixed(2)}
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
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Typography level="body-sm" mx="auto">
          Page 1 of 10
        </Typography>
        <IconButton
          aria-label="next page"
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
