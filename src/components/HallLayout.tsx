import "@mantine/core/styles.css";
import { MantineProvider, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Group } from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import { HallLeftNavBar } from "./HallLeftNavbar";
import { SocketProvider } from "../contexts/SocketContext";

export function HallLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <MantineProvider>
      <SocketProvider>
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: 300,
            breakpoint: "sm",
            collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
          }}
          padding="md"
        >
          <AppShell.Header>
            <Group h="100%" px="md">
              <Burger
                opened={mobileOpened}
                onClick={toggleMobile}
                hiddenFrom="sm"
                size="sm"
              />
              <Burger
                opened={desktopOpened}
                onClick={toggleDesktop}
                visibleFrom="sm"
                size="sm"
              />
              <UnstyledButton component={Link} to={"/"}>
                <Text size="xl" ml="md" fw={700}>
                  游戏大厅
                </Text>
              </UnstyledButton>
            </Group>
          </AppShell.Header>
          <AppShell.Navbar p="md">
            <HallLeftNavBar />
          </AppShell.Navbar>
          <AppShell.Main>
            <Outlet />
          </AppShell.Main>
        </AppShell>
      </SocketProvider>
    </MantineProvider>
  );
}
