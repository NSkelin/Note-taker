import * as React from "react";
import * as ReactDOM from "react-dom";
const {Table} = require("./components/Table.jsx");

class App extends React.Component {
	constructor(props) {
		super(props);
		// this.handleRowChange = this.handleRowChange.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.state = {
			gameTitles: props.gameTitles,
			categories: props.categories,
			headings: props.headings,
			rows: props.rows,
			game: props.gameTitles[0],
			category: props.categories[0],
			episodeNumber: "",
			description: "",
			sentiment: "Positive",
			timeStamp: "",
		};
	}

	handleInputChange(input) {
		const {name, value} = input.target;
		this.setState({[name]: value});
	}

	render() {
		const gameTitles = this.state.gameTitles;
		const categories = this.state.categories;
		const headings = this.state.headings;
		const rows = this.state.rows;

		return (
			<div>
				<Table
					gameTitles={gameTitles}
					categories={categories}
					headings={headings}
					rows={rows}
				/>
			</div>
		);
	}
}

// gets all the initial data from server and parses it into a format readable by components and then renders it.
async function startApp() {
	let gameTitles = await window.api.invoke("requestTitles");
	let data = await window.api.invoke("requestTitleData", gameTitles[0]);
	let headings = ["Category", "Remark", "Sentiment"];
	let categories = Object.keys(data);
	let rows = [];

	// parse data into displayable rows for data tables
	for (const category in data) {
		for (const remark in data[category]) {
			let sentiment = data[category][remark].Sentiment;
			rows.push([category, remark, sentiment]);
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

startApp();
