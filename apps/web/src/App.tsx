import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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

  if (!userSession.isLoggedIn)
    return (
      <Routes>
        <Route path={`/`} element={<LandingPage />} />
        <Route path={`*`} element={<NotFound />} />
      </Routes>
    );

  return (
    <div className="flex flex-row min-h-screen">
      <NavBar className="flex lg:hidden flex-col" />
      <Sidebar className="hidden lg:flex" />
      <div className="flex flex-col items-center w-full py-16 mt-8 px-4 lg:mt-0 lg:px-0">
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`/orgs`} element={<Orgs />} />
          <Route path={`/orgs/new`} element={<OrgNew />} />
          <Route path={`/orgs/:orgId/*`} element={<OrgGeneral />} />
          <Route path={`/settings`} element={<Settings />} />
          <Route path={`*`} element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

const OrgGeneral = (): JSX.Element => {
  const location = useLocation();
  const [name, setName] = useState("");
  useEffect(() => {
    if (location.state && location.state.orgName) {
      setName(location.state.orgName);
    }
  }, [location]);

  return (
    <div className="space-y-6 flex flex-col items-center px-4">
      <h2 className="text-2xl font-bold text-center">{name}</h2>
      <hr className="w-3/4 border-input border-1" />
      <Routes>
        <Route path={`/`} element={<OrgDetails />} />
        <Route path={`activities`} element={<Activities />} />
        <Route path={`assistants`} element={<Assistants />} />
        <Route path={`students`} element={<Students />} />
      </Routes>
    </div>
  );
};
