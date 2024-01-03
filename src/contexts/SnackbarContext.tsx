import * as React from "react";
import Button from "@mui/joy/Button";
import Snackbar from "@mui/joy/Snackbar";
import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";

import { DefaultColorPalette, DefaultVariantProp } from "@mui/joy/styles/types";

export interface ShowNotificationProps {
  message: string;
  color?: DefaultColorPalette;
  variant?: DefaultVariantProp;
}

export const SnackbarContext = React.createContext<{
  open: boolean;
  showNotify: (props: ShowNotificationProps) => void;
}>({
  open: false,
  showNotify: () => {},
});
export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState<DefaultVariantProp>("soft");

  const [color, setColor] = React.useState<DefaultColorPalette>("success");

  const showNotification = (notify: {
    message: string;
    color?: DefaultColorPalette;
    variant?: DefaultVariantProp;
  }) => {
    setMessage(notify.message);
    setColor(notify.color ?? "success");
    setVariant(notify.variant ?? "soft");
    setNotificationOpen(true);
  };

  return (
    <React.Fragment>
      <Snackbar
        variant={variant}
        color={color}
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
        endDecorator={
          <Button
            onClick={() => setNotificationOpen(false)}
            size="sm"
            variant={variant}
            color={color}
          >
            Dismiss
          </Button>
        }
      >
        {message}
      </Snackbar>
      <SnackbarContext.Provider
        value={{ open: notificationOpen, showNotify: showNotification }}
      >
        {children}
      </SnackbarContext.Provider>
    </React.Fragment>
  );
}
