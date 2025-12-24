export default function SectionTitle({ title, subtitle, atCenter }) {
  return (
    <header
      className={`${
        atCenter
          ? "text-center md:pt-10 pt-6 md:pb-20 pb-16"
          : "pb-12 max-lg:text-center"
      }`}
    >
      <h3 className="font-bold text-4xl text-primary mb-3">{title}</h3>
      {subtitle && <p className="text-neutral">{subtitle}</p>}
    </header>
  );
}
