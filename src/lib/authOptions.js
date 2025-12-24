import bcrypt from "bcryptjs";
import { usersCollection } from "./dbCollections";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await usersCollection.findOne({ email });
        const { password: userPassword } = user;
        const isPassMatched = await bcrypt.compare(password, userPassword);
        if (!user || !isPassMatched) {
          return null;
        }
        if (user) {
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        } else {
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log(user, account);
      const isExistingUser = await usersCollection.findOne({
        email: user?.email,
      });
      if (isExistingUser) {
        return {
          success: false,
          status: 409,
          message: "User email already in use!",
        };
      }
      const newUser = {
        email: user?.email,
        name: user?.name,
        image: user?.image,
        provider: account?.provider,
        createdAt: new Date(),
        role: "user",
      };
      const result = await usersCollection.insertOne(newUser);
      if (result.acknowledged) {
        return {
          status: 201,
          success: true,
          message: "User registration is successful!",
        };
      } else {
        return {
          status: 500,
          success: false,
          message: "Something went wrong",
        };
      }
    },
    async jwt({ token, user }) {
      const email = token?.email || user?.email;
      if (email) {
        const dbUser = await usersCollection.findOne({ email });
        if (dbUser && user) {
          token.id = dbUser._id.toString();
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.role = dbUser.role;
          token.image = dbUser?.image || user?.image;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token || session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.image = token?.image;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
