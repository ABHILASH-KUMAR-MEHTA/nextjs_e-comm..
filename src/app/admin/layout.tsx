"use client";

import Loader from "@/components/admin/Loader";
import Login from "@/components/admin/Login";
import { useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";
import React from "react";
import Sidebar from "@/components/admin/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isloading = useAppSelector((store) => store.loadingReducer);
  const { data: session } = useSession();

  if (!session?.user) {
    return <Login />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full h-full">
        <div className="bg-gray-200 p-4 h-[calc(100vh-64px)]">{children}</div>
      </div>
      {isloading && <Loader />}
    </div>
  );
};

export default Layout;
