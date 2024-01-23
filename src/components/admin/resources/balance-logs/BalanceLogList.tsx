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

const BalanceLogList = () => (
  <List
    filters={listFilters}
    perPage={25}
    sort={{ field: "date", order: "DESC" }}
  >
    <Datagrid rowClick="expand">
      <ReferenceField source="userId" reference="users" link="show">
        <TextField source="accountID" />
      </ReferenceField>
      <TextField source="firstName" />
      <NumberField source="amount" />
      <NumberField source="type" />
      <TextField source="amountReason" />
      <TextField source="amountType" />
      <NumberField source="game" />
      <DateField source="createdAt" showTime />
      <DateField source="updatedAt" showTime />
    </Datagrid>
  </List>
);

export default BalanceLogList;
