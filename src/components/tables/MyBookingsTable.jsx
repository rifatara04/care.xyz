"use client";

import { deleteBooking } from "@/app/actions/server/booking";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import BookingTrackerModal from "../modals/BookingTrackerModal";

export default function MyBookingsTable({ bookings }) {
  const [selectedBooking, setSelectedBooking] = useState({});
  const modalRef = useRef(null);
  const handleDeleteBooking = (booking) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Booking for ${booking.serviceName} service will be deleted!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteBooking(booking);
        Swal.fire({
          title: "Deleted!",
          text: "Your booking has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const handleViewTracking = (booking) => {
    setSelectedBooking(booking);
    modalRef?.current?.showModal();
  };
  return (
    <>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 shadow-lg">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>Sl. No</th>
              <th>Service name</th>
              <th>Duration</th>
              <th>Location</th>
              <th>Total Cost</th>
              <th>Status</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={i} className="odd:bg-white bg-base-100">
                <td>{i + 1}</td>
                <td>{b.serviceName}</td>
                <td>{b.duration} Days</td>
                <td>{b.buyerLocation}</td>
                <td>{b.totalCost} BDT</td>
                <td>
                  <span
                    className={`badge badge-sm py-px h-auto rounded-full font-medium capitalize ${
                      b.status === "completed"
                        ? "badge-success"
                        : b.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td>
                  {b.paymentStatus === "unpaid" ? (
                    <button className="btn btn-sm btn-primary text-xs!">
                      Pay Now
                    </button>
                  ) : (
                    <p className="capitalize">{b.paymentStatus}</p>
                  )}
                </td>
                <td>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleViewTracking(b)}
                      className="btn btn-sm text-xs! btn-outline btn-success border-success/20"
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm text-xs! btn-outline btn-error border-error/20"
                      onClick={() => handleDeleteBooking(b)}
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BookingTrackerModal modalRef={modalRef} booking={selectedBooking} />
    </>
  );
}
