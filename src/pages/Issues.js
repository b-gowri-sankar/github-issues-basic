import React from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
const Issues = () => {
	const [issueData, setIssueData] = React.useState([]);

	React.useEffect(() => {
		fetchGithubIssuesData();
	}, []);

	const fetchGithubIssuesData = async () => {
		try {
			const { data } = await axios.get(
				"https://api.github.com/repos/facebook/react/issues"
			);
			setIssueData(data);
		} catch (error) {
			console.error(error);
		}
	};

	console.log(issueData);

	return (
		<>
			{issueData.map((data) => (
				<Link key={data.id} to={`/issues/${data.number}`}>
					<div className="card my-2 cursor-pointer">
						<div className="card-body">
							<div className="card-title">{data.title}</div>
							<p className="text-muted text-small">
								#{data.number} opened {moment(data?.created_at).fromNow()} by{" "}
								{data?.user?.login}
							</p>
						</div>
					</div>
				</Link>
			))}
		</>
	);
};

export default Issues;
