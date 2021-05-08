const React = require("react");
const {TableRow} = require("./TableRow.jsx");
const PropTypes = require("prop-types");

function TableDisplay(props) {
	const headings = props.headings;
	const rows = props.rows;
	const rowID = props.rowID; // Position in the row array that has the unique ID

	const rowElements = rows.map((row) => (
		<TableRow key={row[rowID]} columns={row} />
	));
	return (
		<table>
			<thead>
				<TableRow columns={headings} heading={true} />
			</thead>
			<tbody>{rowElements}</tbody>
		</table>
	);
}

TableDisplay.propTypes = {
	headings: PropTypes.array.isRequired,
	rows: PropTypes.array.isRequired,
	rowID: PropTypes.number.isRequired, // should be an int
};

module.exports = {
	TableDisplay,
};
