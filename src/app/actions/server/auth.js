"use server";
import bcrypt from "bcryptjs";
import { usersCollection } from "@/lib/dbCollections";

export const postUser = async (payload) => {
  try {
    //check duplicate user
    const isExistedUser = await usersCollection.findOne({
      email: payload?.email,
    });
    if (isExistedUser) {
      return {
        success: false,
        status: 409,
        message: "User email already in use!",
      };
    }

    //create new user
    const encryptedPass = await bcrypt.hash(payload.password, 10);
    const newUser = {
      ...payload,
      provider: "credentials",
      password: encryptedPass,
      role: "user",
      createdAt: new Date(),
    };

    //post new user
    const res = await usersCollection.insertOne(newUser);
    if (res.acknowledged) {
      return {
        status: 201,
        success: true,
        message: "Registration is successful!",
      };
    }
  } catch {
    return {
      status: 500,
      success: false,
      message: "Something went wrong!",
    };
  }
};
