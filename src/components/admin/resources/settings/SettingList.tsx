import moment from "moment";
import { List, SimpleList } from "react-admin";
import { Typography, Stack } from "@mui/material";
import { Settings } from "../../../../data";
import {
  DialogContent,
  Dialog,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import React from "react";

function SettingModal(props: { open: boolean; handleClose: () => void }) {
  const { open, handleClose } = props;
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Text in a modal</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

const SettingList = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  return (
    <>
      <SettingModal open={open} handleClose={handleClose} />
      <List perPage={25} sort={{ field: "weight", order: "ASC" }}>
        <SimpleList
          onClick={() => {
            setOpen(true);
          }}
          primaryText={(record) => (Settings as any)[record.key] || ""}
          secondaryText={(record) => {
            return (
              <Stack alignItems={"flex-start"}>
                <Typography variant="body2" component="p" gutterBottom>
                  {record.description}
                </Typography>
                <Typography variant="body2" component="p" gutterBottom>
                  effect range: {record.range}
                </Typography>
              </Stack>
            );
          }}
          tertiaryText={(record) => {
            return (
              <Stack alignItems={"flex-end"}>
                <Typography
                  sx={{
                    wordBreak: "break-all",
                    maxWidth: { xs: "50%", sm: "50%" },
                  }}
                  variant="body1"
                  component="span"
                  gutterBottom
                >
                  {record.value}
                </Typography>{" "}
                <Typography variant="caption" component="p" gutterBottom>
                  Last Saved At {moment(record.updatedAt).fromNow()}
                </Typography>
              </Stack>
            );
          }}
          linkType="edit"
        />
      </List>
    </>
  );
};

export default SettingList;
