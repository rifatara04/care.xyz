import { container, largeBtnPrimary } from "@/utils/classNames";
import Link from "next/link";
import { nameSlug } from "@/utils/nameSlug";
import Image from "next/image";
import RatingComponent from "@/components/Rating";

async function getService(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/data/services.json`,
    { cache: "no-cache" }
  );
  const services = await res.json();
  return services.find((s) => nameSlug(s.title) === slug);
}

export async function generateMetadata({ params }) {
  const { id: slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title}`,
    description: service.metaDescription,
    openGraph: {
      title: `${service.shortDescription}`,
      description: `${service.description}`,
      url: "https://carexyz.vercel.app",
      siteName: "Care.xyz",
      images: [
        {
          url: `${service.image}`,
          width: 1200,
          height: 630,
          alt: `${service.title} | Care.xyz`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function ServiceDetailsPage({ params }) {
  const { id: slug } = await params;
  const service = await getService(slug);
  const { title, image, description, features, pricePerDay, qna, rating } =
    service;
  return (
    <main className={`${container} pt-8 pb-20`}>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-12">
        <div className="max-md:order-2 xl:col-span-2 col-span-1">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <div className="flex gap-2 items-center">
            <RatingComponent value={rating} />
            <p className="text-sm mb-1 text-neutral/75">{rating}</p>
          </div>
          <div className="mt-2 mb-10">
            <p className="text-xl font-semibold">
              {pricePerDay}{" "}
              <span className="text-[1rem] font-medium text-neutral/75">
                BDT/day
              </span>
            </p>
          </div>
          <strong className="text-xl mt-10 block">Features</strong>
          <ul className="list-disc ms-4 mt-5">
            {features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
          <strong className="text-xl mt-10 block">Description</strong>
          <p className="mt-5">{description}</p>
          <strong className="text-xl mt-10 block">Frequent Questions</strong>
          <div className="mt-5">
            {qna.map((q, i) => (
              <div
                key={i}
                className="collapse collapse-arrow bg-white border border-base-300"
              >
                <input type="checkbox" className="peer" />
                <div className="collapse-title font-semibold peer-checked:text-primary">
                  {q.question}
                </div>
                <div className="collapse-content text-sm">{q.answer}</div>
              </div>
            ))}
          </div>
        </div>
        <figure className="relative w-full aspect-5/4 overflow-hidden rounded-2xl md:max-w-2xl max-w-md mx-auto ring-10 ring-primary/20">
          <Image src={image} alt="" fill className="object-cover" />
        </figure>
      </div>
      <div className="mt-8">
        <Link href={`/booking/${nameSlug(title)}`} className={largeBtnPrimary}>
          Book now
        </Link>
      </div>
    </main>
  );
}
