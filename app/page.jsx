import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import VideoWork from "@/components/VideoWork";
import BlogSection from "@/components/BlogSection";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <Stats />
      <VideoWork />
      <Marquee />
      <BlogSection />
      <ContactForm />
    </>
  );
}
