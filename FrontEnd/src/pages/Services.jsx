import React from "react";
import OurServices from "../components/OurServices";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

function Services() {
  return (
    <>
      <Header />
      <Navbar />
      <section className="align-element">
        <OurServices />
      </section>
    </>
  );
}

export default Services;
