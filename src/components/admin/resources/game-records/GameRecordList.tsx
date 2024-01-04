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
    <Datagrid
      rowClick="expand"
      // expand={<GameRecordShow />}
      // sx={{
      //   "& .column-customer_id": {
      //     display: { xs: "none", md: "table-cell" },
      //   },
      //   "& .column-total_ex_taxes": {
      //     display: { xs: "none", md: "table-cell" },
      //   },
      //   "& .column-delivery_fees": {
      //     display: { xs: "none", md: "table-cell" },
      //   },
      //   "& .column-taxes": {
      //     display: { xs: "none", md: "table-cell" },
      //   },
      // }}
    >
      <TextField source="accountID" />
      <TextField source="firstName" />
      <TextField source="gameName" />
      <TextField source="chips" />
      <NumberField source="winChips" />
      <DateField source="createdAt" showTime />
      <DateField source="updatedAt" showTime />
    </Datagrid>
  </List>
);

export default GameRecordList;
