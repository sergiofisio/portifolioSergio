import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export function allowedAdmins() {
  return (process.env.ADMIN_GITHUB_LOGIN ?? "")
    .split(",")
    .map((login) => login.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminLogin(login: unknown) {
  return typeof login === "string" && allowedAdmins().includes(login.toLowerCase());
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  pages: { signIn: "/admin/login", error: "/admin/login" },
  callbacks: {
    signIn({ profile }) {
      return isAdminLogin(profile?.login);
    },
    jwt({ token, profile }) {
      if (profile?.login) token.login = profile.login;
      return token;
    },
    session({ session, token }) {
      session.user.login = typeof token.login === "string" ? token.login : undefined;
      return session;
    },
  },
});

declare module "next-auth" {
  interface Session {
    user: {
      login?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
