import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password, role } = credentials;
        // Check if email and password are provided
        if (!email || !password) {
          return null;
        }
        try {
          if (role === "Admin") {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/auth/adminlogin`,
              {
                method: "POST",
                body: JSON.stringify({ email, password }),
              }
            );
            if (res.status === 404 || res.status === 401) {
              return null;
            }
            const data = await res.json();
            return data;
          } else {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/auth/login`,
              {
                method: "POST",
                body: JSON.stringify({ email, password }),
              }
            );

            if (res.status === 404 || res.status === 401) {
              return null;
            }
            const data = await res.json();
            return data;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user?._id;
        token.role = user?.role;
        token.name = user?.name;
        token.email = user?.email;
        token.isVerified = user?.isVerified;
        token.phone = user?.phone;
        token.department = user?.department;
        token.resume = user?.resume;
      }
      return token;
    },
    // Attach the custom data from the JWT token to the session
    async session({ session, token }) {
      if (token) {
        session._id = token?._id;
        session.role = token?.role;
        session.name = token?.name;
        session.email = token?.email;
        session.isVerified = token?.isVerified;
        session.phone = token?.phone;
        session.department = token?.department;
        session.resume = token?.resume;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
