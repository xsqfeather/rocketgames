import { Card, Flex, Stack, UnstyledButton } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconCards, IconRocket, IconStorm } from "@tabler/icons-react";
import { useContext, useEffect } from "react";
import { SocketContext } from "../contexts/SocketContext";

const UnstyledButtonLink = ({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}) => {
  return (
    <UnstyledButton
      variant="light"
      component={Link}
      to={link}
      style={{
        border: "1px solid #eee",
        borderRadius: 4,
        padding: 10,
        minWidth: 100,
      }}
    >
      {children}
    </UnstyledButton>
  );
};

export default function HomePage() {
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket?.on("/user/lobby/lobbyHandler/login", (msg) => {
      console.log("/lobby/login", msg);
    });
    return () => {
      socket?.off("/user/lobby/lobbyHandler/login");
    };
  }, [socket]);

  return (
    <Stack>
      <Flex justify={"space-around"}>
        <Card
          component={UnstyledButtonLink}
          link="/games/rocket"
          withBorder
          style={{
            "&:hover": {
              backgroundColor: "#d9dbed",
            },
          }}
        >
          <Stack
            align="center"
            gap="sm"
            style={{
              "&:hover": {
                backgroundColor: "#d9dbed",
              },
            }}
          >
            <Card.Section>
              <IconCards />
            </Card.Section>
            <Card.Section>HILO</Card.Section>
          </Stack>
        </Card>
        <Card component={UnstyledButtonLink} link="/games/rocket" withBorder>
          <Stack align="center" gap="sm">
            <Card.Section>
              <IconStorm />
            </Card.Section>
            <Card.Section>挖矿</Card.Section>
          </Stack>
        </Card>
        <Card component={UnstyledButtonLink} link="/games/rocket" withBorder>
          <Stack align="center" gap="sm">
            <Card.Section>
              <IconRocket />
            </Card.Section>
            <Card.Section>火箭游戏</Card.Section>
          </Stack>
        </Card>
      </Flex>
    </Stack>
  );
}
