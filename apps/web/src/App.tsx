import { Route, Routes } from "react-router-dom";
import { Sidebar } from "@/components/sidebar";
import Settings from "@/pages/Settings";
import Orgs from "@/pages/Orgs";
import OrgDetails from "@/pages/OrgDetails";
import OrgNew from "@/pages/OrgNew";
import Activities from "@/pages/management/Activities";
import Assistants from "@/pages/management/Assistants";
import Students from "@/pages/management/Students";
import Home from "@/pages/Home";
import LandingPage from "@/pages/LandingPage";
import NotFound from "@/pages/404";
import { NavBar } from "@/components/navbar";
import { useUserSession } from "@/hooks/useUserSession";

export default function App(): JSX.Element {
  const { userSession } = useUserSession();

  if (userSession.isLoggedIn)
    return (
      <Routes>
        <Route path={`/`} element={<LandingPage />} />
        <Route path={`*`} element={<NotFound />} />
      </Routes>
    );

  return (
    <div className="flex flex-row min-h-screen">
      <NavBar />
      <Sidebar />
      <div className="flex flex-col items-center w-full py-16 mt-8 md:mt-0 px-4 md:px-0">
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`/orgs`} element={<Orgs />} />
          <Route path={`/orgs/:orgId`} element={<OrgDetails />} />
          <Route path={`/orgs/new`} element={<OrgNew />} />
          <Route path={`/orgs/:orgId/activities`} element={<Activities />} />
          <Route path={`/orgs/:orgId/assistants`} element={<Assistants />} />
          <Route path={`/orgs/:orgId/students`} element={<Students />} />
          <Route path={`/settings`} element={<Settings />} />
          <Route path={`*`} element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
