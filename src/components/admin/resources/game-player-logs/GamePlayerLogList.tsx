import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  DateInput,
  ReferenceField,
} from "react-admin";

const listFilters = [
  <DateInput source="date_gte" alwaysOn />,
  <DateInput source="date_lte" alwaysOn />,
];

const GamePlayerLogList = () => (
  <List
    filters={listFilters}
    perPage={25}
    sort={{ field: "date", order: "DESC" }}
  >
    <Datagrid>
      <TextField source="accountID" />
      <ReferenceField source="userId" reference="users" link="show">
        <TextField source="firstName" />
      </ReferenceField>
      <TextField source="logId" />
      <TextField source="gameName" />
      <NumberField source="round" />
      <NumberField source="seat" />
      <DateField source="createdAt" showTime />
      <DateField source="updatedAt" showTime />
    </Datagrid>
  </List>
);

export default GamePlayerLogList;
