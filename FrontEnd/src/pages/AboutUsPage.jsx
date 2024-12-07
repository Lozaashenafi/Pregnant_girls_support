import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import AboutUs from "../components/AboutUs";

function AboutUsPage() {
  return (
    <>
      <Header />
      <Navbar />
      <section className="align-element">
        <AboutUs />
      </section>
    </>
  );
}

export default AboutUsPage;
