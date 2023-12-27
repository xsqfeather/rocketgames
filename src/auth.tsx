import { LoaderFunctionArgs, redirect } from "react-router-dom";

export interface AuthProvider {
  isAuthenticated: boolean;
  username: null | string;
  signIn(username: string): Promise<void>;
  signOut(): Promise<void>;
}

/**
 * This represents some generic auth provider API, like Firebase.
 */
export const RouteAuthProvider: AuthProvider = {
  isAuthenticated: false,
  username: null,
  async signIn(username: string) {
    localStorage.setItem("token", username);
    await new Promise((r) => setTimeout(r, 500)); // fake delay
    RouteAuthProvider.isAuthenticated = true;
    RouteAuthProvider.username = username;
  },
  async signOut() {
    await new Promise((r) => setTimeout(r, 500)); // fake delay
    localStorage.removeItem("token");
    RouteAuthProvider.isAuthenticated = false;
    RouteAuthProvider.username = "";
  },
};

export async function loginLoader() {
  const token = localStorage.getItem("token");
  if (token) {
    RouteAuthProvider.isAuthenticated = true;
    RouteAuthProvider.username = token;
    return redirect("/");
  }

  return null;
}

export async function loginAction({ request }: LoaderFunctionArgs) {
  let formData = await request.formData();
  let username = formData.get("username") as string | null;

  // Validate our form inputs and return validation errors via useActionData()
  if (!username) {
    return {
      error: "You must provide a username to log in",
    };
  }

  try {
    await RouteAuthProvider.signIn(username);
  } catch (error) {
    return {
      error: "Invalid login attempt",
    };
  }

  let redirectTo = formData.get("redirectTo") as string | null;
  return redirect(redirectTo || "/");
}

export async function protectedLoader({ request }: LoaderFunctionArgs) {
  const token = localStorage.getItem("token");
  if (!token) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/auth/login?" + params.toString());
  }
  RouteAuthProvider.isAuthenticated = true;
  RouteAuthProvider.username = token;
  return null;
}
