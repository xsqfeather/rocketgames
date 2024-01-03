import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Typography,
} from "@mui/joy";
import { Form } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { Link as RouterLink } from "react-router-dom";

export default function LoginPage() {
  const { submitting, setSubmitting } = useLogin();
  return (
    <>
      <Stack gap={4} sx={{ mb: 2 }}>
        <Stack gap={1}>
          <Typography level="h3">Sign in</Typography>
          <Typography level="body-sm">
            New to here?{" "}
            <Link component={RouterLink} to="/auth/register" level="title-sm">
              Sign up!
            </Link>
          </Typography>
        </Stack>
      </Stack>
      <Divider
        sx={(theme) => ({
          [theme.getColorSchemeSelector("light")]: {
            color: { xs: "#FFF", md: "text.tertiary" },
            "--Divider-lineColor": {
              xs: "#FFF",
              md: "var(--joy-palette-divider)",
            },
          },
        })}
      >
        or
      </Divider>
      <Stack gap={4} sx={{ mt: 2 }}>
        <Form
          method="post"
          action="/auth/login"
          onSubmit={() => {
            setSubmitting(true);
          }}
        >
          <FormControl required disabled={submitting}>
            <FormLabel>First Name</FormLabel>
            <Input disabled={submitting} type="text" name="firstName" />
          </FormControl>
          <FormControl required disabled={submitting}>
            <FormLabel>Email</FormLabel>
            <Input disabled={submitting} type="email" name="email" />
          </FormControl>
          <Stack gap={4} sx={{ mt: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Checkbox
                disabled={submitting}
                size="sm"
                label="Remember me"
                name="persistent"
              />
              <Link level="title-sm" href="#replace-with-a-link">
                Forgot your password?
              </Link>
            </Box>
            <Button
              startDecorator={
                submitting && <CircularProgress variant="solid" />
              }
              disabled={submitting}
              type="submit"
              fullWidth
            >
              Sign in
            </Button>
          </Stack>
        </Form>
      </Stack>
    </>
  );
}
