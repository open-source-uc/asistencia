import { Route, Routes } from "react-router-dom";
import { Sidebar } from "@/components/sidebar";
import Profile from "@/pages/Profile";
import Orgs from "@/pages/Orgs";
import OrgDetails from "@/pages/OrgDetails";
import OrgNew from "@/pages/OrgNew";
import Activities from "@/pages/management/Activities";
import Assistants from "@/pages/management/Assistants";
import Students from "@/pages/management/Students";

export default function App(): JSX.Element {
  return (
    <div className="flex flex-row min-h-screen">
      <Sidebar className="fixed md:w-1/4 hidden md:block" />
      <div className="md:w-1/4">
      </div>
      <div className="flex flex-col items-center w-full py-16">
        <Routes>
          <Route path={`/`} element={<Profile />} />
          <Route path={`/orgs`} element={<Orgs />} />
          <Route path={`/orgs/:orgId`} element={<OrgDetails />} />
          <Route path={`/orgs/new`} element={<OrgNew />} />
          <Route path={`/orgs/:orgId/activities`} element={<Activities />} />
          <Route path={`/orgs/:orgId/assistants`} element={<Assistants />} />
          <Route path={`/orgs/:orgId/students`} element={<Students />} />
        </Routes>
      </div>
    </div>
  );
}
