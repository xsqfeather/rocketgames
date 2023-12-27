import { Button, Group, TextInput } from "@mantine/core";
import { Form, Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div>
      <Form method="post">
        <TextInput name="firstName" label="用户名" />
        <TextInput name="email" label="邮箱" />
        <Group>
          <Button type="submit">登录</Button>
          <Button component={Link} to="/auth/register">
            注册
          </Button>
        </Group>
      </Form>
    </div>
  );
}
