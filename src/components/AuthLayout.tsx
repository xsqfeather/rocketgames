import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { Paper, Box, Grid, MantineProvider } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { useMediaQuery } from "@mantine/hooks";

export default function AuthLayout() {
  const matches = useMediaQuery("(min-width: 64em)");
  return (
    <MantineProvider>
      <Notifications position="top-right" />
      <Grid align="center">
        <Grid.Col span={{ base: 12, sm: 12, md: 6, lg: 6, xl: 6, xs: 6 }}>
          <Paper
            withBorder
            p={5}
            style={{
              height: "90vh",
              width: "100%",
            }}
          >
            <Outlet />
          </Paper>
        </Grid.Col>
        {matches && (
          <Grid.Col span={{ base: 6, sm: 12, md: 6, lg: 6 }}>
            <Box
              h={"100vh"}
              style={{
                backgroundSize: "cover",
                backgroundImage: `linear-gradient(to bottom,rgba(255, 255, 0, 0.5),rgba(0, 0, 255, 0.5)), url("https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80")`,
              }}
            ></Box>
          </Grid.Col>
        )}
      </Grid>
    </MantineProvider>
  );
}
