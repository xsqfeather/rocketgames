import { useState } from "react";
import Box from "@mui/material/Box";
import { Label as LabelIcon } from "@mui/icons-material";

import {
  useTranslate,
  DashboardMenuItem,
  MenuItemLink,
  MenuProps,
  useSidebarState,
} from "react-admin";

import visitors from "../resources/visitors";
import products from "../resources/products";
import categories from "../resources/categories";
import reviews from "../resources/reviews";
import SubMenu from "./SubMenu";
import GameRecords from "../resources/game-records";
import GameReplays from "../resources/game-replays";

type MenuName = "menuCatalog" | "menuSales" | "menuCustomers" | "gameRecords";

const Menu = ({ dense = false }: MenuProps) => {
  const [state, setState] = useState({
    menuCatalog: true,
    menuSales: true,
    menuCustomers: true,
    gameRecords: true,
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
          placeholder="Game Records"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.game-records.name`, {
            smart_count: 2,
          })}
          leftIcon={<GameRecords.icon />}
          dense={dense}
        />
        <MenuItemLink
          to="/admin/game-replays"
          placeholder="Game Replays"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.game-replays.name`, {
            smart_count: 2,
          })}
          leftIcon={<GameReplays.icon />}
          dense={dense}
        />
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle("menuCatalog")}
        isOpen={state.menuCatalog}
        name="pos.menu.catalog"
        icon={<products.icon />}
        dense={dense}
      >
        <MenuItemLink
          to="/admin/products"
          placeholder="Reviews"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.products.name`, {
            smart_count: 2,
          })}
          leftIcon={<products.icon />}
          dense={dense}
        />
        <MenuItemLink
          to="/admin/categories"
          placeholder="Reviews"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.categories.name`, {
            smart_count: 2,
          })}
          leftIcon={<categories.icon />}
          dense={dense}
        />
      </SubMenu>
      <SubMenu
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
      </SubMenu>
      <MenuItemLink
        to="/admin/reviews"
        placeholder="Reviews"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.reviews.name`, {
          smart_count: 2,
        })}
        leftIcon={<reviews.icon />}
        dense={dense}
      />
    </Box>
  );
};

export default Menu;
