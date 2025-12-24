import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function BookingModalContent({ booking, user }) {
  const [trackingData, setTrackingData] = useState([]);
  useEffect(() => {
    if (!user?.email) return;
    async function loadLogs() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/tracking?email=${user?.email}&service=${booking.serviceName}`
      );
      const data = await res.json();
      setTrackingData(data);
    }
    loadLogs();
  }, [user, booking]);

  return (
    <ul className="timeline timeline-vertical py-3">
      {trackingData.map((d, i) => (
        <li
          key={i}
          className="grid-cols-[var(--timeline-col-start,minmax(0,0fr))_auto_var(--timeline-col-end,minmax(0,1fr))]"
        >
          {i > 0 && <hr />}
          <div className="timeline-middle">
            <FaCheckCircle className="size-5 text-primary" />
          </div>
          <div className="timeline-end timeline-box flex gap-1 bg-white">
            <span className="text-primary">{d.details}</span>
            <span className="text-neutral/80">@</span>
            <span className="text-neutral/80">
              {dayjs(d.createdAt).format("DD MMM, YYYY • hh:mm:ss a")}
            </span>
          </div>
          {i < trackingData.length - 1 && <hr />}
        </li>
      ))}
    </ul>
  );
}
