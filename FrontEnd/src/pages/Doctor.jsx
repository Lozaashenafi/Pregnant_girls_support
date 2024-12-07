import React from "react";
import Doctors from "../components/Doctors";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

function Doctor() {
  return (
    <>
      <Header />
      <Navbar />
      <section className="align-element">
        <Doctors />
      </section>
    </>
  );
}

export default Doctor;
