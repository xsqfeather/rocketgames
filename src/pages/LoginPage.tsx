import { Box, Button, Group, LoadingOverlay, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { Form, Link, useSearchParams } from "react-router-dom";

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");
  const time = searchParams.get("time");
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
  return (
    <Box pos="relative">
      <LoadingOverlay visible={submitting} />
      <Form
        method="post"
        onSubmit={() => {
          setSubmitting(true);
        }}
      >
        <TextInput name="firstName" label="用户名" />
        <TextInput name="email" label="邮箱" />
        <Group>
          <Button type="submit">登录</Button>
          <Button component={Link} to="/auth/register">
            注册
          </Button>
        </Group>
      </Form>
    </Box>
  );
}
