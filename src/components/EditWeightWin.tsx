import {
  Button,
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

export function EditWeightWin(props: {
  weight: number;
  column: number;
  icon: SlotIcon;
  onSuccess: () => void;
}) {
  const { weight, column, icon, onSuccess } = props;
  const [changedWeight, setChangedWeight] = useState(weight);
  const [open, setOpen] = useState(false);
  const socket = useContext(SocketContext);
  const setWeight = ({
    column,
    icon,
  }: {
    weight: number;
    column: number;
    icon: SlotIcon;
  }) => {
    socket?.emit("/user/irishslot/irishslotHandler/setWeight", {
      seq: "1",
      game: "irishslot",
      accountID: localStorage.getItem("accountID"),
      session: localStorage.getItem("token"),
      weight: changedWeight,
      column,
      icon,
    });

    return new Promise((resolve, _reject) => {
      socket?.on("/user/irishslot/irishslotHandler/setWeight", (rlt) => {
        resolve(rlt);
      });
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setWeight({ weight: changedWeight, column, icon }).then((rlt: any) => {
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
          <Typography>
            修改权重,{icon}第{column}列{" "}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack direction={"row"}>
              <Input
                placeholder={"权重"}
                value={changedWeight}
                onChange={(e: any) => {
                  setChangedWeight(e.target.value);
                }}
              />
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
