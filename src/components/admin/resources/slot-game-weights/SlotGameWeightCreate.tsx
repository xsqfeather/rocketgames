import { Create, SimpleForm, TextInput } from "react-admin";

export function SlotGameWeightCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="gameName" />
        <TextInput source="icon" />
        <TextInput source="columnNumber" />
        <TextInput source="weight" />
      </SimpleForm>
    </Create>
  );
}
