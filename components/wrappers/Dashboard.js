import React from "react";
import Header from "@/components/blocks/Header";
import Main from "@/components/wrappers/Main";
import Footer from "@/components/blocks/Footer";
import { useAppContext } from "@/context/AppWrapper";

const Dashboard = ({ children, segmentView }) => {
  const { user } = useAppContext();
  return (
    <>
      {segmentView ? (
        <div className="BLOCK__segment-layout">
          <Header
            isLoggedIn={user?.isLoggedIn}
            firstName={user?.firstName}
            lastName={user?.lastName}
            email={user?.email}
          />
          <Main>{children}</Main>
          <Footer />
        </div>
      ) : (
        <>
          <Header
            isLoggedIn={user?.isLoggedIn}
            firstName={user?.firstName}
            lastName={user?.lastName}
            email={user?.email}
          />
          <Main style={{ minHeight: "100vh" }}>{children}</Main>
          <Footer />
        </>
      )}
    </>
  );
};

export default Dashboard;
