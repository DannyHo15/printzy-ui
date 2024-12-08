"use client";
import React from "react";
import EditorSidebar from "@/components/Editor/EditorSidebar";
import { EditorNavbar } from "@/components/Editor/EditorNavbar";
interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return <>{children}</>;
};

export default Layout;
