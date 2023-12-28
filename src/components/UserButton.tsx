import { UnstyledButton, Group, Text, rem, Menu } from "@mantine/core";
import {
  IconChevronRight,
  IconMessageCircle,
  IconPhoto,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import classes from "../styles/UserButton.module.css";
import { useNavigate } from "react-router-dom";
import { RandomAvatar } from "react-random-avatars";

export function UserButton() {
  const nav = useNavigate();
  return (
    <Menu>
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group>
            <RandomAvatar name={"User"} size={40} />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                Harriette Spoonlicker
              </Text>

              <Text c="dimmed" size="xs">
                hspoonlicker@outlook.com
              </Text>
            </div>

            <IconChevronRight
              style={{ width: rem(14), height: rem(14) }}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown
        style={{
          minWidth: 250,
        }}
      >
        <Menu.Item
          leftSection={
            <IconSettings style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Settings
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconMessageCircle style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Messages
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconPhoto style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Gallery
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          onClick={() => {
            console.log("logout");
            localStorage.clear();
            nav("/auth/login?logout=true");
          }}
          color="red"
          leftSection={
            <IconTrash style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
