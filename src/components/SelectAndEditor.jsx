const React = require("react");
const {useState, useEffect} = require("react");
const {SelectionBox} = require("./SelectionBox.jsx");
const {PropTypes} = require("prop-types");

function SelectAndEditor(props) {
	const gameTitles = props.gameTitles;
	const onSelectChange = props.onSelectChange;
	const onGameTitleSubmit = props.onGameTitleSubmit;
	const [editMode, setEditMode] = useState(false);
	const [newSelect, setNewSelect] = useState("");

	useEffect(() => {
		window.addEventListener("click", function (e) {
			// Clicked outside the div
			if (!document.getElementById("test").contains(e.target)) {
				setEditMode(false);
			}
		});

		// TODO
		// return () => {
		// 	window.removeEventListener("click");
		// };
	});

	function handleSave() {
		onGameTitleSubmit(newSelect);
		setEditMode(false);
	}

	const title = () => {
		if (editMode) {
			return (
				<input
					onChange={(e) => setNewSelect(e.target.value)}
					placeholder="Enter the title"
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
				/>
			);
		}
	};

	return (
		<div id="test">
			<button>edit</button>
			{title()}
			<button onClick={() => setEditMode(true)}>new</button>
			<button onClick={handleSave}>save</button>
			<button>delete</button>
		</div>
	);
}

SelectAndEditor.propTypes = {
	gameTitles: PropTypes.array.isRequired,
	onSelectChange: PropTypes.func,
	onGameTitleSubmit: PropTypes.func,
};

module.exports = {
	SelectAndEditor,
};
