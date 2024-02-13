import {
  Box,
  Button,
  DialogActions,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import { IconX } from "@tabler/icons-react";
import React from "react";
import { useOne } from "../hooks/restful";

export default function CheckRecordDetailWin(props: { betId: string }) {
  const { betId } = props;
  const [open, setOpen] = React.useState(false);

  const data = useOne("my/game-records", betId);

  console.log({ data });

  return (
    <>
      <Button onClick={() => setOpen(true)}>Check Detail</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <ModalClose />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
              padding: 2,
            }}
          ></Box>
          <DialogActions>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Close <IconX />
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
}
