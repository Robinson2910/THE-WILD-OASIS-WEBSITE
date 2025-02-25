import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import {
  createGuest,
  getGuest,
} from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret:
        process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  //this callback will called for the route we mentioned in matcher
  //if authorized route will be displayed
  //else it will redirected to signinpage by default
  callbacks: {
    //     •	callbacks.authorized() → Automatically runs for protected routes:
    // o	If the user is authenticated (auth?.user exists) → Allow access ✅
    // o	If the user is not logged in → Deny access ❌

    //here auth is session
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(
          user.email
        );

        if (!existingGuest)
          await createGuest({
            email: user.email,
            fullName: user.name,
          });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(
        session.user.email
      );
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login", // Redirect to the custom login page
    signOut: "/login",
  },
};

//what we export here in auth .js will be exported in the route hanlder
//so that signin and signup pages work
export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth(authConfig);
