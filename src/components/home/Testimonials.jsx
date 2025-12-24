import { container } from "@/utils/classNames";
import SectionTitle from "../SectionTitle";
import { FaPeopleGroup, FaRegFaceGrinStars } from "react-icons/fa6";
import { HiCheckBadge } from "react-icons/hi2";
import { MdContactSupport } from "react-icons/md";

export default function TestimonialsComponent() {
  const successMetrics = [
    {
      value: "4.9/5",
      label: "Average Client Rating",
      icon: FaRegFaceGrinStars,
    },
    {
      value: "500+",
      label: "Families Served",
      icon: FaPeopleGroup,
    },
    {
      value: "98%",
      label: "Service Satisfaction",
      icon: HiCheckBadge,
    },
    {
      value: "24/7",
      label: "Support Availability",
      icon: MdContactSupport,
    },
  ];

  return (
    <section className={`${container} pb-20`}>
      <SectionTitle
        title={"What Our Clients Say"}
        atCenter={true}
        subtitle={
          "Real experiences from families who trusted us for Baby Care, Elderly Support, and Home Assistance."
        }
      />
      <div className="bg-primary text-primary-content px-10 py-6 rounded-2xl">
        <div className="grid md:grid-cols-4 grid-cols-2 gap-6">
          {successMetrics.map((s, i) => (
            <div className="flex flex-col items-center p-6" key={i}>
              <s.icon className="size-16" />
              <h4 className="text-4xl font-semibold mt-5 mb-1.5">{s.value}</h4>
              <p className="text-sm text-center">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
