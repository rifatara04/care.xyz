"use server";

import { trackingsCollection } from "@/lib/dbCollections";

export const logTracking = async (buyerEmail, serviceName, status, details) => {
  const log = {
    buyerEmail,
    serviceName,
    status,
    details: details || status,
    createdAt: new Date(),
  };
  try {
    await trackingsCollection.insertOne(log);
    return {
      status: 201,
      success: true,
      message: "Log created",
    };
  } catch {
    return {
      status: 500,
      success: false,
      message: "Something went wrong",
    };
  }
};
