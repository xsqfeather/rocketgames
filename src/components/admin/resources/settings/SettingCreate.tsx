import { Create, SimpleForm, TextInput } from "react-admin";

export const SettingEdit = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="key" />
        <TextInput source="value" />
        <TextInput source="description" />
        <TextInput source="range" />
      </SimpleForm>
    </Create>
  );
};
