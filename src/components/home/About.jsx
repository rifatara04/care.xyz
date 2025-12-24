import { container } from "@/utils/classNames";
import SectionTitle from "../SectionTitle";
import Image from "next/image";

export default function AboutComponent() {
  return (
    <section
      className={`${container} grid lg:grid-cols-2 gap-12 md:pt-36 sm:pt-26 pt-16 md:pb-28 pb-18`}
    >
      <figure className="max-lg:order-2 relative max-w-xl mx-auto h-full w-full aspect-[5/3.75] rounded-4xl overflow-hidden border-8 border-secondary/22 ring-8 ring-secondary/8">
        <Image src={"/team.jpg"} className="max-w-2xl" fill alt="" />
      </figure>
      <div>
        <SectionTitle title={"About Us"} />
        <p className="mb-3">
          At <strong>Care.xyz</strong>, we believe that everyone deserves
          attentive, compassionate care, no matter their age or circumstance.
          From baby care to elderly support and care for the sick, our team is
          committed to providing services that improve health, comfort, and
          well-being. Guided by empathy and professionalism, we strive to make
          every moment meaningful and every life cherished. Our mission is to
          build a world where care is not just a service, but a source of hope,
          strength, and happiness for all.
        </p>
        <ul className="list-disc ms-4">
          <li>
            <strong>Compassionate Care</strong> for babies, the elderly, and the
            sick
          </li>
          <li>
            <strong>Trusted & Experienced Team</strong> dedicated to well-being
          </li>
          <li>
            <strong>Safe & Nurturing Environment</strong> for every individual
          </li>
          <li>
            Bringing <strong>Hope</strong>, <strong>Comfort</strong>, and{" "}
            <strong>Happiness</strong> to all
          </li>
        </ul>
      </div>
    </section>
  );
}
