import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FieldProps,
  useDataProvider,
  useNotify,
  useRecordContext,
  useRefresh,
} from "react-admin";
import { TextField } from "@mui/material";

const amountTypes: any = {
  goldCoin: "GOLD_COIN",
  gameChips: "GAME_CHIPS",
};

export default function DepositWin(props: FieldProps) {
  const { label } = props;
  const record = useRecordContext(props);
  const [open, setOpen] = React.useState(false);
  const dataProvider = useDataProvider();
  const refresh = useRefresh();
  const notify = useNotify();

  const [amount, setAmount] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    console.log(amountTypes[props.source ?? "goldCoin"]);
    const { data } = await dataProvider.create("balance-logs", {
      data: {
        accountID: record?.accountID,
        amount,
        amountType: amountTypes[props.source || "goldCoin"],
        amountReason: "Deposit",
      },
    });
    console.log(data);
    console.log(amount);
    setOpen(false);
    refresh();
    notify("Deposit success");
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {label}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Deposit for ${record?.firstName}`}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
