import React, { FC, PropsWithChildren } from "react";

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <main className="py-5">{children}</main>
    </>
  );
};
