import React from "react";
import { Sidebar } from "../Layout/Sidebar";
import { NavItem } from "@/types";
interface UserSidebarProps {
  // isCollapsed: boolean;
  links: NavItem[];
}
const UserSidebar = ({ links }: UserSidebarProps) => {
  return (
    <div className="w-full">
      <Sidebar items={links}></Sidebar>
    </div>
  );
};

export default UserSidebar;
