import type { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Job from "./pages/Job";
import EditJob from "./pages/EditJob";
import NewJob from "./pages/NewJob";

export default function App(): ReactNode {
	return (
		<>
			<Header />
			<div className="relative px-2 pb-2 sm:px-8 sm:pb-4">
				<Routes>
					<Route path="/" element={<Home />}>
						<Route path="job/:id" element={<Job />} />
						<Route path="job/edit/:id" element={<EditJob />} />
						<Route path="job/new" element={<NewJob />} />
					</Route>
				</Routes>
			</div>
		</>
	);
}
