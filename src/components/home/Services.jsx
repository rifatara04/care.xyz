import { container, largeBtnPrimary } from "@/utils/classNames";
import SectionTitle from "../SectionTitle";
import services from "@/../public/data/services.json";
import Image from "next/image";
import RatingComponent from "../Rating";
import Link from "next/link";
import { nameSlug } from "@/utils/nameSlug";

export default function ServicesComponent() {
  return (
    <section className={container}>
      <SectionTitle
        atCenter={true}
        title={"Our Care Services"}
        subtitle={
          "Providing compassionate, professional, and personalized support for babies, the elderly, and those who are unwell."
        }
      />
      <div className="grid lg:grid-cols-3 mx-auto max-lg:max-w-2xl gap-8 md:pb-28 pb-16">
        {services.map((s) => (
          <article
            key={s.id}
            className="p-4 group lg:block sm:flex gap-4 shadow-md rounded-2xl hover:shadow-xl hover:bg-secondary/3 transition-all"
          >
            <figure className="relative lg:w-full sm:w-64 sm:h-64 aspect-5/4 lg:rounded-4xl sm:rounded-xl rounded-4xl flex items-center justify-center overflow-hidden">
              <Image src={s.image} fill alt="" className="object-cover" />
            </figure>
            <div className="flex flex-col justify-between">
              <header className="mt-2">
                <h3 className="text-xl font-bold group-hover:text-primary transition-all">
                  {s.title}
                </h3>
                <p className="mb-8 h-12.5 line-clamp-2 text-neutral">
                  {s.shortDescription}
                </p>
              </header>
              <main className="pt-3">
                <div className="flex justify-between items-center mb-3">
                  <p>
                    Starts from:{" "}
                    <span className="text-xl font-bold">৳{s.pricePerDay}</span>
                  </p>
                  <RatingComponent value={s.rating} />
                </div>
                <Link
                  href={`/service/${nameSlug(s.title)}`}
                  className={`${largeBtnPrimary} btn-block btn-outline border-primary/15`}
                >
                  Learn More
                </Link>
              </main>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
