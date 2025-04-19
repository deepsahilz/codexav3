import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserContextProvider } from "./context/UserContextProvider";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import { SocketProvider } from "./context/SocketContext";

// Lazy-loaded components
import React, { Suspense } from "react";
import AdminProtected from "./components/utils/AdminProtected2";
import AdminDashboard from "./components/AdminDashboard";
import AdminNavbar from "./components/AdminNavbar";
import AdminUsers from "./components/AdminUsers";
import AdminProjects from "./components/AdminProjects";
import { ChatContextProvider } from "./context/ChatContext";
const Error404 = React.lazy(() => import("./components/error404"));
const Signup = React.lazy(() => import("./components/signup"));
const Login = React.lazy(() => import("./components/login"));
const LandingPage1 = React.lazy(() => import("./components/LandingPage1"));
const Layout = React.lazy(() => import("./components/layout"));
const Protectedroutes = React.lazy(() => import("./components/utils/protectedroutes"));
const Editprofile2 = React.lazy(() => import("./components/editprofile2"));
const ProfilePage = React.lazy(() => import("./components/ProfilePage"));
const BountiesPage = React.lazy(() => import("./components/BountiesPage"));
const ExplorePage = React.lazy(() => import("./components/ExplorePage"));
const ChatPage = React.lazy(() => import("./components/ChatPage"));
const ChatPage2 = React.lazy(() => import("./components/ChatPage2"));
const SearchPage = React.lazy(() => import("./components/SearchPage"));
const OpenProject = React.lazy(() => import("./components/OpenProject"));
const AdminPage = React.lazy(() => import("./pages/AdminPage"));
const PageLoader = React.lazy(() => import("./components/PageLoader4"));

function App() {
	console.log("Rendering App");
	
	const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1800);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);


  	return (
		<>
    	<UserContextProvider>
		<SocketProvider>
		<ChatContextProvider>
			
		<Suspense>
        	<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/*" element={<Error404 />} />
				
				<Route element={<Layout />}>

					<Route path="/" element={<LandingPage1 />} />

					<Route element={<Protectedroutes />}>

						<Route element={<AdminProtected/>}>
							{/* <Route element={<AdminLayout/>}> */}
								<Route path="/admin/stats" element={<AdminDashboard />} />
								<Route path="/admin/users" element={<AdminUsers />} />
								<Route path="/admin/projects" element={<AdminProjects />} />
							{/* </Route> */}
						</Route>

						<Route path="/explore" element={<ExplorePage />} />
						<Route path="/chat" element={<ChatPage />} />
						<Route path="/inbox" element={<ChatPage2 />} />
						<Route path="/search" element={<SearchPage />} />
						<Route path="/project/:projectId" element={<OpenProject />} />
						<Route path="/user/:username" element={<ProfilePage />} />
						<Route path="/bounties" element={<BountiesPage />} />
						<Route path="/user/:username/edit" element={<Editprofile2 />} />
					</Route>
				</Route>

			</Routes>
			</Suspense>

			{/* Loader with AnimatePresence to handle exit animations */}
			<AnimatePresence mode="wait">
			{isLoading && <PageLoader />}
			</AnimatePresence>

		</ChatContextProvider>
		</SocketProvider>
		</UserContextProvider>

		<ToastContainer />
		</>
	);
}

export default App;
