const React = require("react");
const {SelectionBox} = require("./SelectionBox.jsx");
const {SelectAndEditor} = require("./SelectAndEditor.jsx");
const {useState} = require("react");
const {PropTypes} = require("prop-types");

function TableInputForm(props) {
	const gameTitles = props.gameTitles;
	const categories = props.categories;
	const selectedGameTitle = props.selectedGameTitle;

	// functions
	const onSelectedGameTitleChange = props.onSelectedGameTitleChange;
	const onGameTitleSubmit = props.onGameTitleSubmit;
	const handleEdit = props.handleEdit;
	const handleDelete = props.handleDelete;

	// state
	const [selectedCategory, setSelectedCategory] = useState(categories[0]);
	const [episodeNumber, setEpisodeNumber] = useState();
	const [description, setDescription] = useState();
	const [selectedSentiment, setSelectedSentiment] = useState("Positive");
	const [timeStamp, setTimeStamp] = useState();

	function handleGameTitleSubmit(gameTitle) {
		onGameTitleSubmit(gameTitle);
	}

	function handleRowSubmit() {
		let newData = {
			category: selectedCategory,
			episodeNumber: episodeNumber,
			description: description,
			sentiment: selectedSentiment,
			timeStamp: timeStamp,
		};
		props.onRowSubmit(newData);
	}

	// function handleInputChange(input) {
	// 	props.onInputChange(input);
	// }

	return (
		<div id="TableInputForm">
			<SelectAndEditor
				gameTitles={gameTitles}
				onSelectChange={onSelectedGameTitleChange}
				onGameTitleSubmit={handleGameTitleSubmit}
				selectedGameTitle={selectedGameTitle}
				handleEdit={handleEdit}
				handleDelete={handleDelete}
			/>
			<SelectionBox
				labelName="Category"
				name="category"
				id="Category"
				options={categories}
				onChange={setSelectedCategory}
			/>
			<input
				name="episodeNumber"
				placeholder="Episode number"
				onChange={(e) => setEpisodeNumber(e.target.value)}
			/>
			<input
				name="description"
				placeholder="Description"
				onChange={(e) => setDescription(e.target.value)}
			/>
			<SelectionBox
				labelName="Sentiment"
				name="sentiment"
				id="Sentiment"
				options={["Positive", "Neutral", "Negative"]}
				onChange={setSelectedSentiment}
			/>
			<input
				name="timeStamp"
				placeholder="Time stamp"
				onChange={(e) => setTimeStamp(e.target.value)}
			/>
			<button onClick={handleRowSubmit}>Submit</button>
		</div>
	);
}

TableInputForm.propTypes = {
	gameTitles: PropTypes.array,
	categories: PropTypes.array,
	onRowSubmit: PropTypes.func,
	onSelectedGameTitleChange: PropTypes.func,
	onGameTitleSubmit: PropTypes.func,
};

module.exports = {
	TableInputForm,
};
