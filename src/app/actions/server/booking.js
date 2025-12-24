"use server";

import { bookingsCollection, trackingsCollection } from "@/lib/dbCollections";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { logTracking } from "./logTracking";
import { sendBookingEmail } from "@/lib/sendEmail";

export const postBooking = async (payload) => {
  try {
    const isExistedBooking = await bookingsCollection.findOne({
      buyerEmail: payload.buyerEmail,
      serviceName: payload.serviceName,
      status: { $nin: ["finished", "completed"] },
    });
    if (isExistedBooking) {
      return {
        status: 409,
        success: false,
        message: "This booking is already on progress, try updating it!",
      };
    }
    const { district, division, ...safePayload } = payload;
    const newBooking = {
      ...safePayload,
      buyerLocation: payload.district,
      paymentStatus: "unpaid",
      status: "pending",
      bookedAt: new Date(),
    };
    const res = await bookingsCollection.insertOne(newBooking);
    if (res.acknowledged) {
      try {
        await sendBookingEmail(payload.buyerEmail, newBooking);
      } catch (mailError) {
        console.error(
          "Email failed to send, but booking was saved:",
          mailError
        );
      }
      logTracking(
        payload.buyerEmail,
        payload.serviceName,
        newBooking.status,
        "Booking created."
      );
      return {
        status: 201,
        insertedId: res.insertedId.toString(),
        success: true,
        message: "Successfully created new booking!",
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

export const deleteBooking = async (booking) => {
  try {
    const result = await bookingsCollection.deleteOne({
      _id: new ObjectId(booking._id.toString()),
    });
    if (result.acknowledged && result.deletedCount !== 0) {
      revalidatePath("/my-bookings");
      await trackingsCollection.deleteMany({
        serviceName: booking.serviceName,
      });
      return {
        status: 200,
        success: true,
        message: "Booking Deleted!",
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
