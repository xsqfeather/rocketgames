import { useState } from "react";
import Box from "@mui/material/Box";

import {
  useTranslate,
  DashboardMenuItem,
  MenuItemLink,
  MenuProps,
  useSidebarState,
} from "react-admin";

import products from "../resources/products";
import SubMenu from "./SubMenu";
import GameRecords from "../resources/game-records";
import GameReplays from "../resources/game-player-logs";
import Users from "../resources/users";
import Settings from "../resources/settings";
import BalanceLogs from "../resources/balance-logs";
import SlotGameWeights from "../resources/slot-game-weights";
import SlotPayRates from "../resources/slot-pay-rates";

type MenuName =
  | "menuCatalog"
  | "menuSales"
  | "menuCustomers"
  | "gameRecords"
  | "menuUser"
  | "menuSettings";

const Menu = ({ dense = false }: MenuProps) => {
  const [state, setState] = useState({
    menuCatalog: true,
    menuSales: true,
    menuCustomers: true,
    gameRecords: true,
    menuUser: true,
    menuSettings: true,
  });
  const translate = useTranslate();
  const [open] = useSidebarState();

  const handleToggle = (menu: MenuName) => {
    setState((state) => ({ ...state, [menu]: !state[menu] }));
  };

  return (
    <Box
      sx={{
        width: open ? 200 : 50,
        marginTop: 1,
        marginBottom: 1,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <DashboardMenuItem />
      <SubMenu
        handleToggle={() => handleToggle("gameRecords")}
        isOpen={state.gameRecords}
        name="pos.menu.game-records"
        icon={<GameRecords.icon />}
        dense={dense}
      >
        <MenuItemLink
          to="/admin/game-records"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.game-records.name`, {
            smart_count: 2,
          })}
          leftIcon={<GameRecords.icon />}
          dense={dense}
        />
        <MenuItemLink
          to="/admin/player-action-game-logs"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.player-action-game-logs.name`, {
            smart_count: 2,
          })}
          leftIcon={<GameReplays.icon />}
          dense={dense}
        />
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle("menuUser")}
        isOpen={state.menuUser}
        name="pos.menu.users"
        icon={<products.icon />}
        dense={dense}
      >
        <MenuItemLink
          to="/admin/users"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.users.name`, {
            smart_count: 2,
          })}
          leftIcon={<Users.icon />}
          dense={dense}
        />
        <MenuItemLink
          to="/admin/balance-logs"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.balance-logs.name`, {
            smart_count: 2,
          })}
          leftIcon={<BalanceLogs.icon />}
          dense={dense}
        />
      </SubMenu>
      {/* <SubMenu
        handleToggle={() => handleToggle("menuCustomers")}
        isOpen={state.menuCustomers}
        name="pos.menu.customers"
        icon={<visitors.icon />}
        dense={dense}
      >
        <MenuItemLink
          to="/admin/customers"
          placeholder="Reviews"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.customers.name`, {
            smart_count: 2,
          })}
          leftIcon={<visitors.icon />}
          dense={dense}
        />
        <MenuItemLink
          to="/admin/segments"
          placeholder="Reviews"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.segments.name`, {
            smart_count: 2,
          })}
          leftIcon={<LabelIcon />}
          dense={dense}
        />
      </SubMenu> */}
      {/* <MenuItemLink
        to="/admin/reviews"
        placeholder="Reviews"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.reviews.name`, {
          smart_count: 2,
        })}
        leftIcon={<reviews.icon />}
        dense={dense}
      /> */}
      <SubMenu
        handleToggle={() => handleToggle("menuSettings")}
        isOpen={state.menuSettings}
        name="pos.menu.settings"
        icon={<products.icon />}
        dense={dense}
      >
        <MenuItemLink
          to="/admin/settings"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.settings.name`, {
            smart_count: 2,
          })}
          leftIcon={<Settings.icon />}
          dense={dense}
        />
        <MenuItemLink
          to="/admin/slot-game-weights"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.slot-game-weights.name`, {
            smart_count: 2,
          })}
          leftIcon={<SlotGameWeights.icon />}
          dense={dense}
        />
        <MenuItemLink
          to="/admin/slot-pay-rates"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.slot-pay-rates.name`, {
            smart_count: 2,
          })}
          leftIcon={<SlotPayRates.icon />}
          dense={dense}
        />
      </SubMenu>
    </Box>
  );
};

export default Menu;
