import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateInput,
  BooleanField,
  Button,
} from "react-admin";

const listFilters = [
  <DateInput source="date_gte" alwaysOn />,
  <DateInput source="date_lte" alwaysOn />,
];

const UserList = () => (
  <List
    filters={listFilters}
    perPage={25}
    sort={{ field: "date", order: "DESC" }}
  >
    <Datagrid rowClick="expand">
      <TextField source="accountID" />
      <TextField source="firstName" />
      <NumberField source="goldCoin" />
      <NumberField source="gameChips" />
      <Button variant="contained" color="primary" label="Deposit Gold Coin" />
      <Button
        variant="contained"
        color="secondary"
        label="Deposit Game Chips"
      />
      <BooleanField source="isOnline" />
      <Button label="Kick Out" variant="outlined" color="error" />
    </Datagrid>
  </List>
);

export default UserList;
