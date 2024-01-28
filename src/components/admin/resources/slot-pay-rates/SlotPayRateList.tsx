import { Datagrid, EditButton, List, TextField } from "react-admin";

export function SlotPayRateList() {
  return (
    <List>
      <Datagrid>
        <TextField source="id" />
        <TextField source="gameName" />
        <TextField source="icon" />
        <TextField source="rate" />
        <EditButton />
      </Datagrid>
    </List>
  );
}
