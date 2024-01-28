import { SlotIcon } from "@prisma/client";
import { Edit, NumberInput, SelectInput, SimpleForm } from "react-admin";

export function SlotGameWeightEdit() {
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
        <NumberInput source="columnNumber" />
        <NumberInput source="weight" />
      </SimpleForm>
    </Edit>
  );
}
