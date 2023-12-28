import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { Paper, Box, Grid, MantineProvider } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Notifications } from "@mantine/notifications";

export default function AuthLayout() {
  return (
    <MantineProvider>
      <Notifications position="top-right" />
      <Grid justify="space-around" align="center">
        <Grid.Col span={6} p={3}>
          <Paper radius={0} p={30}>
            <Outlet />
          </Paper>
        </Grid.Col>
        <Grid.Col span={6}>
          <Box
            h={"100vh"}
            style={{
              backgroundSize: "cover",
              backgroundImage: `linear-gradient(to bottom,rgba(255, 255, 0, 0.5),rgba(0, 0, 255, 0.5)), url("https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80")`,
            }}
          ></Box>
        </Grid.Col>
      </Grid>
    </MantineProvider>
  );
}
