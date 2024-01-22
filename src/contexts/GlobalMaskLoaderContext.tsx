import * as React from "react";

import { CircularProgress, Modal, Stack, Typography } from "@mui/joy";

export interface GlobalMaskLoaderProps {
  message: string;
}

export const GlobalMaskLoaderContext = React.createContext<{
  open: boolean;
  showMaskLoader: (props: GlobalMaskLoaderProps) => void;
  closeMaskLoader: (props: GlobalMaskLoaderProps) => void;
}>({
  open: false,
  showMaskLoader: () => {},
  closeMaskLoader: () => {},
});
export function GlobalMaskLoaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [maskOpen, setMaskOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const showMaskLoader = (notify: { message: string }) => {
    setMessage(notify.message);
    setMaskOpen(true);
  };

  const closeMaskLoader = (notify: { message: string }) => {
    setMessage(notify.message);
    setMaskOpen(false);
  };

  return (
    <React.Fragment>
      <Modal
        open={maskOpen}
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          zIndex: 100002,
        }}
      >
        <Stack
          sx={{ height: "100vh" }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CircularProgress />
          <Typography>{message}</Typography>
        </Stack>
      </Modal>
      <GlobalMaskLoaderContext.Provider
        value={{
          open: maskOpen,
          showMaskLoader: showMaskLoader,
          closeMaskLoader: closeMaskLoader,
        }}
      >
        {children}
      </GlobalMaskLoaderContext.Provider>
    </React.Fragment>
  );
}
