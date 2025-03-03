import ContactForm from "@/components/ContactForm";
import HeroPage from "@/components/HeroPage";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import WhatIdo from "@/components/WhatIdo";

const MainPage = () => {
  return (
    <main className="w-full p-4">
      <Navbar />
      <HeroPage />
      <WhatIdo />
      <Timeline />
      <Projects />
      <ContactForm />
    </main>
  );
};

export default MainPage;
