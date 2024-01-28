import polyglotI18nProvider from "ra-i18n-polyglot";
import {
  Admin,
  CustomRoutes,
  Resource,
  localStorageStore,
  useStore,
} from "react-admin";
import { Route } from "react-router";

import authProvider from "./authProvider";
import { Dashboard } from "./dashboard";
import englishMessages from "./i18n/en";
import { Layout, Login } from "./layout";

import Segments from "./resources/segments/Segments";
import { themes, ThemeName } from "./themes/themes";
import { restProvider } from "./dataProvider/rest";
import gameRecords from "./resources/game-records";
import users from "./resources/users";
import settings from "./resources/settings";
import gamePlayerLogs from "./resources/game-player-logs";
import balanceLogs from "./resources/balance-logs";
import slotGameWeights from "./resources/slot-game-weights";
import slotPayRates from "./resources/slot-pay-rates";

const i18nProvider = polyglotI18nProvider(
  (locale) => {
    if (locale === "fr") {
      return import("./i18n/fr").then((messages) => messages.default);
    }

    // Always fallback on english
    return englishMessages;
  },
  "en",
  [
    { locale: "en", name: "English" },
    { locale: "fr", name: "Français" },
  ]
);

const store = localStorageStore(undefined, "ECommerce");
const AdminApp = () => {
  const [themeName] = useStore<ThemeName>("themeName", "soft");
  const lightTheme = themes.find((theme) => theme.name === themeName)?.light;
  const darkTheme = themes.find((theme) => theme.name === themeName)?.dark;
  return (
    <Admin
      title=""
      dataProvider={restProvider}
      store={store}
      authProvider={authProvider}
      dashboard={Dashboard}
      loginPage={Login}
      layout={Layout}
      i18nProvider={i18nProvider}
      disableTelemetry
      lightTheme={lightTheme}
      darkTheme={darkTheme}
      defaultTheme="light"
      basename="/admin"
    >
      <CustomRoutes>
        <Route path="segments" element={<Segments />} />
      </CustomRoutes>
      {/* <Resource name="customers" {...visitors} />
      <Resource name="commands" {...orders} options={{ label: "Orders" }} />
      <Resource name="invoices" {...invoices} />
      <Resource name="products" {...products} />
      <Resource name="categories" {...categories} />
      <Resource name="reviews" {...reviews} /> */}
      <Resource name="player-action-game-logs" {...gamePlayerLogs} />
      <Resource name="game-records" {...gameRecords} />
      <Resource name="users" {...users} />
      <Resource name="settings" {...settings} />
      <Resource name="balance-logs" {...balanceLogs} />
      <Resource name="slot-game-weights" {...slotGameWeights} />
      <Resource name="slot-pay-rates" {...slotPayRates} />
    </Admin>
  );
};

export default AdminApp;
