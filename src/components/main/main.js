import React from "react";
import Header from "../header/header";
import Intro from "../intro/intro";

const Main = () => {
  return (
    <React.Fragment>
      {/* Header component */}
      <Header />

      <main className="main">
        {/* Intro component */}
        <Intro />
      </main>
    </React.Fragment>
  );
};

export default Main;
