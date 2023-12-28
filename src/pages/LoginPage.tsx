import {
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { Form, Link, useSearchParams } from "react-router-dom";

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");
  const time = searchParams.get("time");
  const logout = searchParams.get("logout");
  useEffect(() => {
    if (time) {
      setSubmitting(false);
      notifications.show({
        title: "用户或者密码错误",
        message: "请检查您的输入，或者先注册! 🤥",
        color: "red",
      });
    }
  }, [error, time]);

  useEffect(() => {
    if (logout) {
      setSubmitting(false);
      notifications.show({
        title: "登出",
        message: "您已经安全登出! 🤥",
        color: "yellow",
      });
    }
  }, [logout]);
  return (
    <Stack
      pos="relative"
      align="center"
      style={{
        maxWidth: 400,
        margin: "auto",
      }}
    >
      <Title>登录游戏</Title>
      <Divider />
      <LoadingOverlay visible={submitting} />
      <Form
        method="post"
        onSubmit={() => {
          setSubmitting(true);
        }}
      >
        <Stack>
          <TextInput name="firstName" label="用户名" />
          <TextInput name="email" label="邮箱" />
          <Group justify="space-around">
            <Button type="submit">登录</Button>
            <Button component={Link} to="/auth/register">
              注册
            </Button>
          </Group>
        </Stack>
      </Form>
    </Stack>
  );
}
