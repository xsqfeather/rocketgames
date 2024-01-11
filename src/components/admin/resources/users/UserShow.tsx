import { Show, SimpleShowLayout, TextField } from "react-admin";

export function UserShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="firstName" />
      </SimpleShowLayout>
    </Show>
  );
}
