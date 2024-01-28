import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  ReferenceField,
} from "react-admin";

const GameRecordList = () => (
  <List perPage={25} sort={{ field: "createdAt", order: "DESC" }}>
    <Datagrid rowClick="expand">
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
