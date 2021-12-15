import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Issues from "./pages/Issues";
import SingleIssue from "./pages/SingleIssue";

function App() {
	return (
		<div>
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
