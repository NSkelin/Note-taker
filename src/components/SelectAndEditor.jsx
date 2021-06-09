const React = require("react");
const {useState, useEffect} = require("react");
const {SelectionBox} = require("./SelectionBox.jsx");
const {PropTypes} = require("prop-types");

function SelectAndEditor(props) {
	// props
	const selectOptions = props.selectOptions;
	const selectedOption = props.selectedOption;

	// functions
	const passSelectionChangeHandler = props.passSelectionChangeHandler;
	const handleSave = props.saveHandler;
	const handleDelete = props.deleteHandler;
	const handleEdit = props.editHandler;

	// state
	const [editMode, setEditMode] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [newMode, setNewMode] = useState(false);

	useEffect(() => {
		window.addEventListener("click", function (e) {
			// Clicked outside the div
			if (
				!document.getElementById("selectAndEditor").contains(e.target)
			) {
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
		setInputValue(selectedOption);
	}

	function onSaveClick() {
		if (newMode) {
			setNewMode(false);
			handleSave(inputValue);
		} else if (editMode) {
			setEditMode(false);
			handleEdit(selectedOption, inputValue);
		}
	}

	function onNewClick() {
		setNewMode(true);
		setInputValue("");
	}

	function onDeleteClick() {
		handleDelete(selectedOption);
	}

	function handleInputChange(event) {
		setInputValue(event.target.value);
	}

	const selectionOrInput = () => {
		if (editMode || newMode) {
			return (
				<input
					onChange={handleInputChange}
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
					options={selectOptions}
					onChange={passSelectionChangeHandler}
					selectedOption={selectedOption}
				/>
			);
		}
	};

	return (
		<div id="selectAndEditor">
			<button onClick={onEditClick}>edit</button>
			{selectionOrInput()}
			<button onClick={onNewClick}>new</button>
			<button onClick={onSaveClick}>save</button>
			<button onClick={onDeleteClick}>delete</button>
		</div>
	);
}

SelectAndEditor.propTypes = {
	selectOptions: PropTypes.array.isRequired,
	selectedOption: PropTypes.string.isRequired,
	passSelectionChangeHandler: PropTypes.func.isRequired,
	saveHandler: PropTypes.func.isRequired,
	deleteHandler: PropTypes.func.isRequired,
	editHandler: PropTypes.func.isRequired,
};

module.exports = {
	SelectAndEditor,
};
