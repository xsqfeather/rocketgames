import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
  NumberField,
} from "react-admin";

import FullNameField from "../visitors/FullNameField";
import AddressField from "../visitors/AddressField";
import InvoiceShow from "./InvoiceShow";

const InvoiceList = () => (
  <List perPage={25} sort={{ field: "createdAt", order: "DESC" }}>
    <Datagrid
      rowClick="expand"
      expand={<InvoiceShow />}
      sx={{
        "& .column-customer_id": {
          display: { xs: "none", md: "table-cell" },
        },
        "& .column-total_ex_taxes": {
          display: { xs: "none", md: "table-cell" },
        },
        "& .column-delivery_fees": {
          display: { xs: "none", md: "table-cell" },
        },
        "& .column-taxes": {
          display: { xs: "none", md: "table-cell" },
        },
      }}
    >
      <TextField source="id" />
      <DateField source="date" />
      <ReferenceField source="customer_id" reference="customers">
        <FullNameField />
      </ReferenceField>
      <ReferenceField
        source="customer_id"
        reference="customers"
        link={false}
        label="resources.invoices.fields.address"
      >
        <AddressField />
      </ReferenceField>
      <ReferenceField source="command_id" reference="commands">
        <TextField source="reference" />
      </ReferenceField>
      <NumberField source="total_ex_taxes" />
      <NumberField source="delivery_fees" />
      <NumberField source="taxes" />
      <NumberField source="total" />
    </Datagrid>
  </List>
);

export default InvoiceList;
