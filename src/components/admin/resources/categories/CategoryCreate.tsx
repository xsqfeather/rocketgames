import {
  Create,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
} from "react-admin";
import { Box } from "@mui/material";

const CategoryCreate = () => (
  <Create>
    <SimpleForm
      sx={{ maxWidth: 500 }}
      defaultValues={{
        name: "",
        image: null,
      }}
    >
      <Box>
        <Box flex={2} mr={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="name" fullWidth helperText={false} />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <ImageInput source="image">
            <ImageField source="src" title="title" />
          </ImageInput>
        </Box>
      </Box>
    </SimpleForm>
  </Create>
);

export default CategoryCreate;
