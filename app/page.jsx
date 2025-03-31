import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import HeroPage from "@/components/HeroPage";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import WhatIdo from "@/components/WhatIdo";

const MainPage = () => {
  return (
    <main className="w-full py-4 ">
      <Navbar />
      <HeroPage />
      <WhatIdo />
      <Timeline />
      <Projects />
      <ContactForm />
      <Footer />
    </main>
  );
};

export default MainPage;
