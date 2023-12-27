import {People as VisitorIcon} from "@mui/icons-material";

import VisitorList from "./VisitorList";
import VisitorCreate from "./VisitorCreate";
import VisitorEdit from "./VisitorEdit";

const resource = {
  list: VisitorList,
  create: VisitorCreate,
  edit: VisitorEdit,
  icon: VisitorIcon,
  recordRepresentation: (record: any) =>
    `${record.first_name} ${record.last_name}`,
};

export default resource;
