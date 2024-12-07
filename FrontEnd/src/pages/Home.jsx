import React from "react";
import Header from "../components/Header";
import Bannner from "../components/Bannner";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Banner from "../components/Bannner";
import OurServices from "../components/OurServices";
import AboutUs from "../components/AboutUs";
import Doctors from "../components/Doctors";

const Home = () => {
  return (
    <>
      <Header />
      <Navbar />
      <section className="align-element">
        <Banner />
        <OurServices />
        <AboutUs />
        <Doctors />
      </section>
    </>
  );
};

export default Home;
