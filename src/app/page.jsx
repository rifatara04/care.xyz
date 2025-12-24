import AboutComponent from "@/components/home/About";
import BannerComponent from "@/components/home/Banner";
import ServicesComponent from "@/components/home/Services";
import TestimonialsComponent from "@/components/home/Testimonials";

export default async function Home() {
  return (
    <>
      <BannerComponent />
      <AboutComponent />
      <ServicesComponent />
      <TestimonialsComponent />
    </>
  );
}
