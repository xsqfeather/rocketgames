import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
} from "@mui/joy";
import { SlotIcon } from "@prisma/client";
import { useContext, useState } from "react";
import { SocketContext } from "../contexts/SocketContext";

export function EditRateWin(props: {
  rates: number[];
  icon: SlotIcon;
  onSuccess: () => void;
}) {
  const { rates, icon, onSuccess } = props;
  const [changedRate, setChangedRate] = useState<string[]>(rates.map(String));
  const [open, setOpen] = useState(false);
  const socket = useContext(SocketContext);
  const setRate = ({ icon }: { rates: number[]; icon: SlotIcon }) => {
    socket?.emit("/user/irishslot/irishslotHandler/setRates", {
      seq: "1",
      game: "irishslot",
      accountID: localStorage.getItem("accountID"),
      session: localStorage.getItem("token"),
      rates: changedRate,
      icon,
    });

    return new Promise((resolve, _reject) => {
      socket?.on("/user/irishslot/irishslotHandler/setRates", (rlt) => {
        resolve(rlt);
      });
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setRate({ rates: changedRate.map(Number), icon }).then((rlt: any) => {
      console.log({ rlt });
      const data = rlt.data;
      console.log({ data });
      setOpen(false);
      onSuccess();
    });
  };
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <ModalClose />
          <Typography>修改赔率-{icon}</Typography>
          <form onSubmit={handleSubmit}>
            <Stack gap={3}>
              <FormControl>
                <FormLabel>3连</FormLabel>
                <Input
                  placeholder="3连"
                  value={changedRate[2]}
                  onChange={(e) => {
                    const newRate = [...changedRate];
                    newRate[2] = e.target.value;
                    setChangedRate(newRate);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>4连</FormLabel>
                <Input
                  placeholder="4连"
                  value={changedRate[3]}
                  onChange={(e) => {
                    const newRate = [...changedRate];
                    newRate[3] = e.target.value;
                    setChangedRate(newRate);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>5连</FormLabel>
                <Input
                  placeholder="5连"
                  value={changedRate[4]}
                  onChange={(e) => {
                    const newRate = [...changedRate];
                    newRate[4] = e.target.value;
                    setChangedRate(newRate);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>6连</FormLabel>
                <Input
                  placeholder="6连"
                  value={changedRate[5]}
                  onChange={(e) => {
                    const newRate = [...changedRate];
                    newRate[5] = e.target.value;
                    setChangedRate(newRate);
                  }}
                />
              </FormControl>

              <Button type="submit">提交</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        修改
      </Button>
    </>
  );
}
