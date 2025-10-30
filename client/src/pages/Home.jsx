import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import BlogList from "../components/BlogList";
import Newsleter from "../components/Newsleter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <BlogList />
      <Newsleter />
      <Footer />
    </div>
  );
};

export default Home;
