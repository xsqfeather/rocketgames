import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  Button,
} from "react-admin";
import DepositWin from "./DepositWin";

const UserList = () => (
  <List perPage={25} sort={{ field: "createdAt", order: "DESC" }}>
    <Datagrid rowClick="expand">
      <TextField source="accountID" />
      <TextField source="firstName" />
      <NumberField source="goldCoin" />
      <DepositWin label="Deposit Gold Coin" source="goldCoin" />
      <NumberField source="gameChips" />
      <DepositWin label="Deposit Game Chips" source="gameChips" />
      <BooleanField source="isOnline" />
      <Button label="Kick Out" variant="outlined" color="error" />
    </Datagrid>
  </List>
);

export default UserList;
