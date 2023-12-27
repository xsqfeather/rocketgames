import { Button, Group, Select, Stack, TextInput } from "@mantine/core";
import { Form, Link, useSearchParams } from "react-router-dom";

export default function RegisterPage() {
  //get error params from url
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");
  console.log({ error });
  return (
    <Form method="post">
      <Stack>
        <TextInput name="firstName" label="用户名" error={error} />
        <TextInput name="email" label="邮箱" />
        <Select
          label="设备"
          placeholder="请选择设备"
          name="deviceOS"
          data={[
            { label: "IOS", value: "0" },
            { label: "Android", value: "1" },
          ]}
        />
        <Group>
          <Button type="submit">注册</Button>
          <Button component={Link} to="/auth/login">
            登录
          </Button>
        </Group>
      </Stack>
    </Form>
  );
}
