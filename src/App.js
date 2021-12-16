import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Issues from "./pages/Issues";
import SingleIssue from "./pages/SingleIssue";

function App() {
	return (
		<div className="container">
			<h1 className="h1 text-center my-5"> Facebook/React Issues </h1>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Issues />} />
					<Route path="/issues/:id" element={<SingleIssue />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
