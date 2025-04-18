
import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { DashboardProfile } from "@/components/dashboard/dashboard-profile";
import { DashboardOrders } from "@/components/dashboard/dashboard-orders";
import { DashboardLoyalty } from "@/components/dashboard/dashboard-loyalty";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DashboardOverview />} />
        <Route path="profile" element={<DashboardProfile />} />
        <Route path="orders" element={<DashboardOrders />} />
        <Route path="loyalty" element={<DashboardLoyalty />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
