const React = require("react");
const PropTypes = require("prop-types");

function TableRow(props) {
	const columns = props.columns;
	const heading = props.heading;

	const row = columns.map((column) => {
		if (heading) {
			return <th id="tableHeading">{column}</th>;
		} else {
			return <td className="tableColumns">{column}</td>;
		}
	});

	return <tr>{row}</tr>;
}
TableRow.defaultProps = {
	heading: false,
};

TableRow.propTypes = {
	columns: PropTypes.array.isRequired,
	heading: PropTypes.bool,
};

module.exports = {
	TableRow,
};
