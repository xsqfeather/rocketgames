import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  ReferenceField,
  DateTimeInput,
} from "react-admin";

import { SearchInput } from "react-admin";

const recordFilters = [
  <SearchInput source="q" alwaysOn />,
  <DateTimeInput source="createdAt.gte" alwaysOn />,
  <DateTimeInput source="createdAt.lte" alwaysOn />,
];

const GameRecordList = () => (
  <List
    perPage={25}
    sort={{ field: "createdAt", order: "DESC" }}
    filters={recordFilters}
  >
    <Datagrid rowClick="expand">
      <TextField source="betId" label="ORDER ID" />
      <TextField source="accountID" />
      <ReferenceField source="userId" reference="users" link="show">
        <TextField source="firstName" />
      </ReferenceField>
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
