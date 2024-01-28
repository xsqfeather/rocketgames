import { SlotIcon } from "@prisma/client";
import { Edit, SelectInput, SimpleForm, TextInput } from "react-admin";

export function SlotPayRateEdit() {
  return (
    <Edit>
      <SimpleForm>
        <SelectInput
          source="gameName"
          choices={[
            {
              id: "irishslot",
              name: "irish-slot",
            },
          ]}
        />
        <SelectInput
          source="icon"
          choices={Object.keys(SlotIcon).map((icon) => {
            return {
              id: icon,
              name: icon,
            };
          })}
        />
        <TextInput source="rate" />
      </SimpleForm>
    </Edit>
  );
}
