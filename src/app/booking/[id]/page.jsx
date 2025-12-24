import BookingForm from "@/components/forms/BookingForm";
import SectionTitle from "@/components/SectionTitle";
import { authOptions } from "@/lib/authOptions";
import { container } from "@/utils/classNames";
import { nameSlug } from "@/utils/nameSlug";
import { getServerSession } from "next-auth";

export default async function BookingPage({ params }) {
  const { user } = await getServerSession(authOptions);
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/data/services.json`
  );
  const locationRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/data/locations.json`
  );
  const locations = await locationRes.json();
  const services = await res.json();
  const service = services.find((s) => nameSlug(s.title) === id);

  return (
    <>
      <SectionTitle
        atCenter={true}
        title={"Book Service"}
        subtitle={`Book the ${service?.title} now with easy steps`}
      />
      <main className={container}>
        <div className="bg-white rounded-2xl shadow px-3 lg:py-8 sm:py-6 py-3 mb-16">
          <BookingForm user={user} service={service} locations={locations} />
        </div>
      </main>
    </>
  );
}
