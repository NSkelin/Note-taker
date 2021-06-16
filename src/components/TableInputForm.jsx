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

	return (
		<div id="TableInput">
			<SelectAndEditor
				selectOptions={gameTitles}
				passSelectionChangeHandler={onSelectedGameTitleChange}
				saveHandler={handleGameTitleSubmit}
				selectedOption={selectedGameTitle}
				editHandler={handleEdit}
				deleteHandler={handleDelete}
			/>
			<div id="userInput">
				<textarea
					id="userDesc"
					size="50"
					placeholder="Description"
					onChange={(e) => setDescription(e.target.value)}
				/>

				<div id="epDetails">
					<input
						id="userTimeStamp"
						placeholder="Time stamp"
						onChange={(e) => setTimeStamp(e.target.value)}
					/>
					<input
						id="userEpNum"
						placeholder="Episode number"
						onChange={(e) => setEpisodeNumber(e.target.value)}
					/>
				</div>
			</div>
			<div id="selectAndSubmit">
				<div id="dropdowns">
					<SelectionBox
						id="Category"
						options={categories}
						onChange={setSelectedCategory}
					/>
					<SelectionBox
						id="Sentiment"
						options={["Positive", "Neutral", "Negative"]}
						onChange={setSelectedSentiment}
					/>
				</div>
				<button className="buttonText" onClick={handleRowSubmit}>
					Submit
				</button>
			</div>
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
