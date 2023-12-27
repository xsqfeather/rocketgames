import { LoaderFunctionArgs, redirect } from "react-router-dom";
import axios from "axios";
import { ENDPOINT } from "../constants";

export async function loginAction({ request }: LoaderFunctionArgs) {
  try {
    const formData = await request.formData();
    const firstName = formData.get("firstName") as string | null;
    const email = formData.get("email") as string | null;
    console.log({
      firstName,
      email,
    });
    const loginRlt = await axios.post(`${ENDPOINT}/lobby/signIn`, {
      firstName,
      email,
    });
    console.log({ loginRlt });
    if (loginRlt.data.code === 502) {
      //user already exists
      return redirect(`/auth/login?error=${loginRlt.data.message}`);
    }
    localStorage.setItem("token", loginRlt.data.session);
    localStorage.setItem("accountID", loginRlt.data.accountID);
    const redirectTo = formData.get("redirectTo") as string | null;
    return redirect(redirectTo || "/");
  } catch (error) {
    console.error({ error });
    return null;
  }
}
