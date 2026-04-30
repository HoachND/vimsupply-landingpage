"use client";
import { I18nProvider } from "@/context/I18nContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Solutions from "@/components/Solutions";
import Benefits from "@/components/Benefits";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Process from "@/components/Process";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Widgets from "@/components/Widgets";

export default function Home() {
  return (
    <I18nProvider>
      <Navbar />
      <Hero />
      <Solutions />
      <Benefits />
      <About />
      <Gallery />
      <Process />
      <ContactForm />
      <Footer />
      <Widgets />
    </I18nProvider>
  );
}
