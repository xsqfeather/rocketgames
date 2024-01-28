import { Datagrid, EditButton, List, TextField } from "react-admin";

export function SlotGameWeightList() {
  return (
    <List>
      <Datagrid>
        <TextField source="id" />
        <TextField source="gameName" />
        <TextField source="icon" />
        <TextField source="columnNumber" />
        <TextField source="weight" />
        <EditButton />
      </Datagrid>
    </List>
  );
}
