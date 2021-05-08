const React = require("react");
const {PropTypes} = require("prop-types");

function SelectionBox(props) {
	const labelName = props.labelName;
	const options = props.options;
	const name = props.name;
	const onChange = props.onChange;

	const opt = options.map((option) => <option key={option}>{option}</option>);

	return (
		<label>
			{labelName}
			<select name={name} onChange={(e) => onChange(e.target.value)}>
				{opt}
			</select>
		</label>
	);
}

SelectionBox.propTypes = {
	labelName: PropTypes.string,
	options: PropTypes.array.isRequired,
	name: PropTypes.string,
	onChange: PropTypes.func,
};

module.exports = {
	SelectionBox,
};
