import { connect } from "./dbConnect";

export const usersCollection = connect("users");
export const bookingsCollection = connect("bookings");
export const trackingsCollection = connect("trackings");
