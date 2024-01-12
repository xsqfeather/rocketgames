import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function OnLineStatic(props: { duration: number }) {
  const { duration } = props;
  const [rlt, setRlt] = useState<any>({});
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_ENDPOINT}/admin/get-users-activity?duration=${
        duration || 600
      }`,
      {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setRlt(data);
      });
  }, []);
  return <Typography variant="h3">{rlt.activity}P</Typography>;
}
