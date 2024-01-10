import { Edit, SimpleForm, TextInput } from "react-admin";

export const SettingEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="key" />
        <TextInput source="value" />
        <TextInput multiline fullWidth source="description" />
        <TextInput source="range" />
      </SimpleForm>
    </Edit>
  );
};
