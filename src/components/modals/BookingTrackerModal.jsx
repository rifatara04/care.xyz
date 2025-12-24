"use client";

import { useSession } from "next-auth/react";
import BookingModalContent from "./BookingModalContent";

export default function BookingTrackerModal({ modalRef, booking }) {
  const { data } = useSession();
  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold mb-6">Booking Timeline</h3>
        <p>
          Service Name:{" "}
          <span className="font-semibold">{booking.serviceName}</span>
        </p>
        <BookingModalContent booking={booking} user={data?.user} />
        <div className="modal-action">
          <button
            className="btn btn-neutral"
            onClick={() => modalRef?.current?.close()}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
