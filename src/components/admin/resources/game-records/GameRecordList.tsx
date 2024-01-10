import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  DateInput,
} from "react-admin";

const listFilters = [
  <DateInput source="date_gte" alwaysOn />,
  <DateInput source="date_lte" alwaysOn />,
];

const GameRecordList = () => (
  <List
    filters={listFilters}
    perPage={25}
    sort={{ field: "date", order: "DESC" }}
  >
    <Datagrid rowClick="expand">
      <TextField source="accountID" />
      <TextField source="firstName" />
      <TextField source="gameName" />
      <NumberField source="chips" />
      <NumberField source="winChips" />
      <DateField source="createdAt" showTime />
      <DateField source="updatedAt" showTime />
    </Datagrid>
  </List>
);

export default GameRecordList;
