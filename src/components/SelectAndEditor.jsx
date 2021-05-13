const React = require("react");
const {useState, useEffect} = require("react");
const {SelectionBox} = require("./SelectionBox.jsx");
const {PropTypes} = require("prop-types");

function SelectAndEditor(props) {
	const gameTitles = props.gameTitles;
	const selectedGameTitle = props.selectedGameTitle;

	// functions
	const onSelectChange = props.onSelectChange;
	const onGameTitleSubmit = props.onGameTitleSubmit;
	const handleDelete = props.handleDelete;
	const handleEdit = props.handleEdit;

	// state
	const [editMode, setEditMode] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [newMode, setNewMode] = useState(false);

	useEffect(() => {
		window.addEventListener("click", function (e) {
			// Clicked outside the div
			if (!document.getElementById("test").contains(e.target)) {
				setEditMode(false);
				setNewMode(false);
			}
		});

		// TODO
		// return () => {
		// 	window.removeEventListener("click");
		// };
	});

	function onEditClick() {
		setEditMode(true);
		setInputValue(selectedGameTitle);
	}

	function onSaveClick() {
		if (newMode) {
			onGameTitleSubmit(inputValue);
			setNewMode(false);
		} else if (editMode) {
			setEditMode(false);
			handleEdit(selectedGameTitle, inputValue);
		}
	}

	function onNewClick() {
		setNewMode(true);
		setInputValue("");
	}

	function onDeleteClick() {
		handleDelete(selectedGameTitle);
	}

	function handleInputChange(event) {
		setInputValue(event.target.value);
	}

	const title = () => {
		if (editMode) {
			return (
				<input
					onChange={handleInputChange}
					placeholder="Enter the title"
					value={inputValue}
				/>
			);
		} else if (newMode) {
			return (
				<input
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="Enter the title"
					value={inputValue}
				/>
			);
		} else {
			return (
				<SelectionBox
					labelName="Game"
					name="game"
					id="Category"
					options={gameTitles}
					onChange={onSelectChange}
					selectedGameTitle={selectedGameTitle}
				/>
			);
		}
	};

	return (
		<div id="test">
			<button onClick={onEditClick}>edit</button>
			{title()}
			<button onClick={onNewClick}>new</button>
			<button onClick={onSaveClick}>save</button>
			<button onClick={onDeleteClick}>delete</button>
		</div>
	);
}

SelectAndEditor.propTypes = {
	gameTitles: PropTypes.array.isRequired,
	selectedGameTitle: PropTypes.string,
	onSelectChange: PropTypes.func,
	onGameTitleSubmit: PropTypes.func,
};

module.exports = {
	SelectAndEditor,
};
