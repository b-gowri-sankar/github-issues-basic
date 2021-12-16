import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleIssue = () => {
	const { id } = useParams();
	const [issueId, setIssueId] = React.useState(0);
	const [issueData, setIssueData] = React.useState(null);
	const [commentData, setCommentData] = React.useState(null);
	const [pageNumber, setPageNumber] = React.useState(1);
	const [nextPageData, setNextPageData] = React.useState([]);

	React.useEffect(() => {
		id && setIssueId(id);
	}, [id]);

	React.useEffect(() => {
		fetchDataForSingleIssue();
	}, [issueId]);

	React.useEffect(() => {
		fetchCommentData();
	}, [issueId, pageNumber]);

	const fetchCommentData = async () => {
		try {
			const { data } = await axios.get(
				`https://api.github.com/repos/facebook/react/issues/${issueId}/comments?page=${pageNumber}`
			);
			const { data: futureData } = await axios.get(
				`https://api.github.com/repos/facebook/react/issues/${issueId}/comments?page=${
					pageNumber + 1
				}`
			);
			setNextPageData(futureData);
			setCommentData(data);
		} catch (error) {
			console.error(error);
		}
	};

	const fetchDataForSingleIssue = async () => {
		try {
			const { data } = await axios.get(
				`https://api.github.com/repos/facebook/react/issues/${issueId}`
			);
			setIssueData(data);
		} catch (error) {
			console.error(error);
		}
	};

	if (!issueData && !commentData) {
		return <div>Loading</div>;
	}

	console.log(commentData);
	return (
		<div>
			<h1 className="h3 border-bottom pb-3">
				{issueData?.title}
				<span className="text-muted">#{issueData?.number}</span>
			</h1>
			{commentData?.map((data) => (
				<div className="card my-3">
					<div className="card-body">
						{" "}
						<img
							src={data.user.avatar_url}
							alt={data.user.number}
							width="30px"
							height="30px"
						/>
						<p className="d-inline-block pl-3">
							user: <span className="text-muted">{data.user.login}</span>
						</p>
						<div>{data.body}</div>
					</div>
				</div>
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
					disabled={nextPageData.length === 0}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default SingleIssue;
