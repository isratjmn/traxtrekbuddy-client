"use client";

import DrawerDashboard from "@/component/Dashboard/DrawerDashboard";
import { isLoggedIn } from "@/services/auth.service";

import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return <DrawerDashboard>{children}</DrawerDashboard>;
};

export default DashboardLayout;
