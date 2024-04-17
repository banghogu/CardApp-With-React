import { useAppSelector } from "@/hooks";
import { RootState } from "@/store";
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((state: RootState) => state.userSlice);
  if (user === null) {
    return <Navigate to="/signin" replace={true} />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
