import { LoaderFunctionArgs, redirect } from "react-router-dom";
import axios from "axios";
import { ENDPOINT } from "../constants";

export async function registerAction({ request }: LoaderFunctionArgs) {
  try {
    const formData = await request.formData();
    const firstName = formData.get("firstName") as string | null;
    const email = formData.get("email") as string | null;
    const deviceOS = formData.get("deviceOS") as string | null;
    console.log({ firstName, email, deviceOS });
    const regRlt = await axios.post(`${ENDPOINT}/lobby/signUp`, {
      firstName,
      email,
      deviceOS,
    });
    console.log({ regRlt });
    if (regRlt.data.code === 502) {
      //user already exists
      return redirect(`/auth/register?error=${regRlt.data.message}`);
    }
    localStorage.setItem("token", regRlt.data.session);
    localStorage.setItem("accountID", regRlt.data.accountID);
    const redirectTo = formData.get("redirectTo") as string | null;
    return redirect(redirectTo || "/");
  } catch (error) {
    console.error({ error });
    return null;
  }
}
