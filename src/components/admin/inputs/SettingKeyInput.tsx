import TextField from "@mui/material/TextField";
import { useController } from "react-hook-form";

export const SettingKeyInput = ({
  name,
  label,
}: {
  name: string;
  label: string;
}) => {
  const {
    field,
    fieldState: { isTouched, invalid, error },
    formState: { isSubmitted },
  } = useController({ name, defaultValue: "" });

  console.log({ field });
  console.log({ isTouched });
  console.log({ isSubmitted });

  return (
    <TextField
      {...field}
      label={label}
      error={(isTouched || isSubmitted) && invalid}
      helperText={(isTouched || isSubmitted) && invalid ? error?.message : ""}
    />
  );
};
