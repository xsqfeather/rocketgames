import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Typography,
} from "@mui/joy";
import { useContext, useEffect, useState } from "react";
import { Form, useSearchParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { SnackbarContext } from "../contexts/SnackbarContext";

export default function RegisterPage() {
  const [submitting, setSubmitting] = useState(false);
  //get error params from url
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");
  const time = searchParams.get("time");

  const { showNotify } = useContext(SnackbarContext);

  useEffect(() => {
    if (error) {
      setSubmitting(false);
      showNotify({
        color: "danger",
        message: "Registration error: 🤥" + error,
      });
    }
  }, [error, time]);
  return (
    <>
      <Stack gap={4} sx={{ mb: 2 }}>
        <Stack gap={1}>
          <Typography level="h3">Sign up</Typography>
          <Typography level="body-sm">
            Already had an account?{" "}
            <Link component={RouterLink} to="/auth/login" level="title-sm">
              Sign In!
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
          action="/auth/register"
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
            <Button
              startDecorator={
                submitting && <CircularProgress variant="solid" />
              }
              disabled={submitting}
              type="submit"
              fullWidth
            >
              Sign Up
            </Button>
          </Stack>
        </Form>
      </Stack>
    </>
  );
}
