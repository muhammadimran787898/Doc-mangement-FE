import React, { Fragment } from "react";
import Header from "./(component)/header";
import Sidebar from "./(component)/sidebar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      <div className="grid h-screen grid-cols-12 gap-4 border border-white">
        <div className="col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-10">
          <Header />
          <div>{children}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default HomeLayout;
