const React = require("react");
const {TableDisplay} = require("./TableDisplay.jsx");
const {TableInputForm} = require("./TableInputForm.jsx");
const {useState} = require("react");
const {PropTypes} = require("prop-types");

function Table(props) {
	const categories = props.categories;
	const headings = props.headings;
	const [gameTitles, setGameTitles] = useState(props.gameTitles);
	const [selectedGameTitle, setSelectedGameTitle] = useState(gameTitles[0]);
	const [rows, setRows] = useState(props.rows);

	async function handleRowChange(data) {
		let newRows = [...rows];

		// add to database
		let result = await window.api.invoke(
			"addRemark",
			selectedGameTitle,
			data.category,
			data.description,
			data.sentiment,
			data.episodeNumber,
			data.timeStamp
		);
		console.log(result);

		// update table
		newRows.push([data.category, data.description, data.sentiment]);
		setRows(newRows);
	}

	async function handleSelectedGameTitleChange(gameTitle) {
		setSelectedGameTitle(gameTitle);

		// update table with selected titles data
		let data = await window.api.invoke("requestTitleData", gameTitle);
		let rows = [];

		for (const category in data) {
			for (const remark in data[category]) {
				let sentiment = data[category][remark].Sentiment;
				rows.push([category, remark, sentiment]);
			}
		}
		setRows(rows);
	}

	async function handleGameTitlesChange(gameTitle) {
		let newGameTitles = [...gameTitles];

		console.log(gameTitle);

		// add new gameTitle to database
		let result = await window.api.invoke("addTitle", gameTitle);
		console.log(result);

		// update page
		newGameTitles.push(gameTitle);
		setGameTitles(newGameTitles);
	}

	return (
		<div>
			<TableInputForm
				gameTitles={gameTitles}
				categories={categories}
				onRowSubmit={handleRowChange}
				onInputChange={this.handleInputChange}
				onSelectedGameTitleChange={handleSelectedGameTitleChange}
				onGameTitleSubmit={handleGameTitlesChange}
			/>
			<TableDisplay headings={headings} rows={rows} rowID={1} />
		</div>
	);
}

Table.propTypes = {
	gameTitles: PropTypes.array,
	categories: PropTypes.array,
	headings: PropTypes.array,
	rows: PropTypes.array,
};

module.exports = {
	Table,
};
