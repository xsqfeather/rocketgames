import { Button, Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";
import axios from "axios";
import React, { useEffect } from "react";

export default function CheckActionLogWin(props: {
  logId: string;
  game: string;
}) {
  const { logId, game } = props;
  const [open, setOpen] = React.useState(false);
  const [log, setLog] = React.useState<any>();
  useEffect(() => {
    if (logId && game && open) {
      axios
        .get(
          `${import.meta.env.VITE_ENDPOINT}/action_logs/${game}/${logId}.json`
        )
        .then((res) => {
          setLog(res.data?.actions);
        });
    }
  }, [logId, game, open]);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Check Actions</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <ModalClose />
          <Typography>{logId}</Typography>
          <Typography>{game}</Typography>
          <Typography>{JSON.stringify(log)}</Typography>
        </ModalDialog>
      </Modal>
    </>
  );
}
