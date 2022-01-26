const React = require("react");
const ReactDOM = require("react-dom");
const {Table} = require("./components/Table.jsx");
const {PropTypes} = require("prop-types");

function App(props) {
	const gameTitles = props.gameTitles;
	const categories = props.categories;
	const headings = props.headings;
	const rows = props.rows;

	return (
		<Table
			gameTitles={gameTitles}
			categories={categories}
			headings={headings}
			rows={rows}
		/>
	);
}

// gets all the initial data from server and parses it into a format readable by components and then renders it.
async function startApp() {
	let gameTitles = await window.api.invoke("requestTitles");
	let data = await window.api.invoke("requestTitleData", gameTitles[0]);

	if (data === false) data = [];
	else if (!data) throw "failed to retrieve data";

	let headings = ["Category", "Remark", "Sentiment", "Count", ""];
	let categories = Object.keys(data);
	let rows = [];

	// parse data into displayable rows for data tables
	let deleteBut = <button>X</button>;
	let count = (
		<div>
			10
			<button>eye</button>
		</div>
	);
	for (const category in data) {
		for (const remark in data[category]) {
			let sentiment = data[category][remark].Sentiment;
			rows.push([category, remark, sentiment, count, deleteBut]);
		}
	}

	ReactDOM.render(
		<App
			gameTitles={gameTitles}
			headings={headings}
			rows={rows}
			categories={categories}
		/>,
		document.getElementById("root")
	);
}

App.propTypes = {
	gameTitles: PropTypes.array,
	headings: PropTypes.array,
	categories: PropTypes.array,
	rows: PropTypes.array,
};

startApp();
