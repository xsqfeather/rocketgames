import { SlotIcon } from "@prisma/client";
import { Create, NumberInput, SelectInput, SimpleForm } from "react-admin";

export function SlotGameWeightCreate() {
  return (
    <Create>
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
    </Create>
  );
}
