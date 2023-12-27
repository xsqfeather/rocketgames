import * as React from "react";
import { Create, TabbedForm, TextInput, required } from "react-admin";
import { ProductEditDetails } from "./ProductEditDetails";
const RichTextInput = React.lazy(() =>
  // @ts-expect-error
  import("ra-input-rich-text").then((module) => ({
    default: module.RichTextInput,
  }))
);

const ProductCreate = () => (
  <Create>
    <TabbedForm defaultValues={{ sales: 0 }} syncWithLocation={false}>
      <TabbedForm.Tab
        label="resources.products.tabs.image"
        sx={{ maxWidth: "40em" }}
      >
        <TextInput autoFocus source="image" fullWidth validate={required()} />
        <TextInput source="thumbnail" fullWidth validate={required()} />
      </TabbedForm.Tab>
      <TabbedForm.Tab
        label="resources.products.tabs.details"
        sx={{ maxWidth: "40em" }}
        path="details"
      >
        <ProductEditDetails />
      </TabbedForm.Tab>
      <TabbedForm.Tab
        label="resources.products.tabs.description"
        path="description"
      >
        <RichTextInput source="description" label="" />
      </TabbedForm.Tab>
    </TabbedForm>
  </Create>
);

export default ProductCreate;
