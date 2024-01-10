import { CSSProperties } from "react";
import { useMediaQuery, Theme } from "@mui/material";

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "0.5em" },
  rightCol: { flex: 1, marginLeft: "0.5em" },
  singleCol: { marginTop: "1em", marginBottom: "1em" },
};

const Dashboard = () => {
  const isXSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  return isXSmall ? (
    <div>mobile</div>
  ) : isSmall ? (
    <div style={styles.flexColumn as CSSProperties}>small</div>
  ) : (
    <>
      <div style={styles.flex}>medium</div>
    </>
  );
};

export default Dashboard;
