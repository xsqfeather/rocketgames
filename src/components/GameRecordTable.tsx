/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";

import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import moment from "moment";
import { GameRecord } from "@prisma/client";

export default function GameRecordTable(props: {
  rows: GameRecord[];
  handlePageChange: (page: number) => void;
  page: number;
}) {
  const { rows, page, handlePageChange } = props;

  return (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: "flex", sm: "none" },
          my: 1,
          gap: 1,
        }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
      </Sheet>

      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th
                style={{ width: 140, padding: "12px 6px", textAlign: "center" }}
              >
                Order ID
              </th>
              <th
                style={{ width: 140, padding: "12px 6px", textAlign: "center" }}
              >
                Game
              </th>

              <th
                style={{ width: 140, padding: "12px 6px", textAlign: "center" }}
              >
                Chips
              </th>
              <th
                style={{ width: 240, padding: "12px 6px", textAlign: "center" }}
              >
                Win Chips
              </th>
              <th
                style={{ width: 140, padding: "12px 6px", textAlign: "center" }}
              >
                Chip Point
              </th>

              <th
                style={{ width: 140, padding: "12px 6px", textAlign: "center" }}
              >
                Check Detail
              </th>
              <th
                style={{ width: 140, padding: "12px 6px", textAlign: "center" }}
              >
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((row: any) => (
              <tr key={row.id}>
                <td>
                  <Typography level="body-xs">{row.betId}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{row.gameName}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">
                    {row.chips.toFixed(2)}
                  </Typography>
                </td>
                <td>
                  <Typography level="body-xs">
                    {row.winChips.toFixed(2)}
                  </Typography>
                </td>
                <td>
                  <Typography level="body-xs">
                    {row.chipPoint.toFixed(2)}
                  </Typography>
                </td>
                <td>
                  <Button>Check Detail</Button>
                </td>
                <td>
                  <Typography level="body-xs">
                    {moment(row.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          disabled={page === 1}
          startDecorator={<KeyboardArrowLeftIcon />}
          onClick={() => {
            handlePageChange(page - 1);
          }}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        {Array.from({ length: 10 }, (_, i) => {
          return i + 1;
        }).map((p) => (
          <IconButton
            key={p}
            size="sm"
            variant={Number(p) === page ? "outlined" : "plain"}
            color="neutral"
            onClick={() => {
              handlePageChange(Number(p));
            }}
          >
            {p}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />

        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => {
            handlePageChange(page + 1);
          }}
          endDecorator={<KeyboardArrowRightIcon />}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}
