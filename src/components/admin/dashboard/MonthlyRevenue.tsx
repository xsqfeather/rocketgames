import {AttachMoney as DollarIcon} from "@mui/icons-material";
import { useTranslate } from "react-admin";

import CardWithIcon from "./CardWithIcon";

interface Props {
  value?: string;
}

const MonthlyRevenue = (props: Props) => {
  const { value } = props;
  const translate = useTranslate();
  return (
    <CardWithIcon
      to="/admin/commands"
      icon={DollarIcon}
      title={translate("pos.dashboard.monthly_revenue")}
      subtitle={value}
    />
  );
};

export default MonthlyRevenue;
