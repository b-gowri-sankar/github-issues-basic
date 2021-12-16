import React from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
const Issues = () => {
	const [issueData, setIssueData] = React.useState([]);
	const [nextPageIssueData, setNextPageIssueData] = React.useState([]);
	const [pageNumber, setPageNumber] = React.useState(1);

	React.useEffect(() => {
		fetchGithubIssuesData();
	}, [pageNumber]);

	const fetchGithubIssuesData = async () => {
		try {
			const { data } = await axios.get(
				`https://api.github.com/repos/facebook/react/issues?page=${pageNumber}`
			);
			const { data: futureData } = await axios.get(
				`https://api.github.com/repos/facebook/react/issues?page=${
					pageNumber + 1
				}`
			);
			setNextPageIssueData(futureData);
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

			<div
				className="btn-group mb-5 mt-3"
				role="group"
				aria-label="Basic mixed styles example"
			>
				<button
					type="button"
					className="btn btn-outline-secondary"
					onClick={() => setPageNumber((pageNumber) => pageNumber - 1)}
					disabled={pageNumber === 1}
				>
					Previous
				</button>
				<button type="button" className="btn btn-primary">
					{pageNumber}
				</button>
				<button
					type="button"
					className="btn btn-outline-secondary"
					onClick={() => setPageNumber((pageNumber) => pageNumber + 1)}
					disabled={nextPageIssueData.length === 0}
				>
					Next
				</button>
			</div>
		</>
	);
};

export default Issues;
