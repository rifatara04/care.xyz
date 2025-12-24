import SectionTitle from "@/components/SectionTitle";
import { container } from "@/utils/classNames";
import { getServerSession } from "next-auth";
import MyBookingsTable from "@/components/tables/MyBookingsTable";

export default async function MyBookingsPage() {
  const { user } = await getServerSession();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings?email=${user?.email}`,
    { cache: "no-cache" }
  );
  const bookings = await res.json();
  return (
    <div>
      <SectionTitle title={"My Bookings"} atCenter={true} />
      <div className={container}>
        {bookings.length > 0 ? (
          <MyBookingsTable bookings={bookings} />
        ) : (
          <p className="py-10 px-3 bg-white shadow text-center text-neutral font-semibold rounded-2xl">
            No bookings available!
          </p>
        )}
      </div>
    </div>
  );
}
