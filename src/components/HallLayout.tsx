import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";

import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { SocketProvider } from "../contexts/SocketContext";
import { SnackbarProvider } from "../contexts/SnackbarContext";
import { GlobalMaskLoaderProvider } from "../contexts/GlobalMaskLoaderContext";

export function HallLayout() {
  return (
    <SnackbarProvider>
      <SocketProvider>
        <CssVarsProvider disableTransitionOnChange>
          <CssBaseline />
          <GlobalMaskLoaderProvider>
            <Box sx={{ display: "flex", minHeight: "100dvh" }}>
              <Header />
              <Sidebar />
              <Box
                component="main"
                className="MainContent"
                sx={{
                  px: { xs: 2, md: 6 },
                  pt: {
                    xs: "calc(12px + var(--Header-height))",
                    sm: "calc(12px + var(--Header-height))",
                    md: 3,
                  },
                  pb: { xs: 2, sm: 2, md: 3 },
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 0,
                  height: "100dvh",
                  gap: 1,
                }}
              >
                <Outlet />
              </Box>
            </Box>
          </GlobalMaskLoaderProvider>
        </CssVarsProvider>
      </SocketProvider>
    </SnackbarProvider>
  );
}
