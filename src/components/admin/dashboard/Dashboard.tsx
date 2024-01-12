import { CSSProperties } from "react";
import { Paper, CardContent } from "@mui/material";
import { Stack, Typography, Card } from "@mui/material";
import OnLineStatic from "./OnlineStatic";

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "0.5em" },
  rightCol: { flex: 1, marginLeft: "0.5em" },
  singleCol: { marginTop: "1em", marginBottom: "1em" },
};

const Dashboard = () => {
  return (
    <Paper
      style={styles.flexColumn as CSSProperties}
      sx={{
        padding: 2,
        marginTop: 2,
      }}
    >
      <Typography variant="h5">Current User Activities </Typography>
      <Stack
        direction={"row"}
        justifyContent={"space-around"}
        flexWrap={"wrap"}
      >
        <Card>
          <CardContent>
            <OnLineStatic duration={600} />
            <Typography variant="caption">10 mins</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <OnLineStatic duration={3600} />
            <Typography variant="caption">1 hour</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <OnLineStatic duration={3600 * 24} />
            <Typography variant="caption">1 day</Typography>
          </CardContent>
        </Card>
      </Stack>
    </Paper>
  );
};

export default Dashboard;
