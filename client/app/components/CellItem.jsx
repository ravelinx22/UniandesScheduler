import React, { Component  } from "react";

export default class CellItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
	}

	_getInstructors() {
		var list = this.props.class.instructors.map((d) => {
			return this._capitalize(d.name);
		});
		return list.join(",");
	}

	// Helpers
	_capitalize(str) {
		return str
			.toLowerCase()
			.split(' ')
			.map(function(word) {
				if(word.length > 0) {
					return word[0].toUpperCase() + word.substr(1);
				}
			})
			.join(' ');
	}

	_handleClick() {
		this.props._onSelectedClass(this.props.class);
	}

	render() {
		return (
			<div className="cell_item" onClick={this._handleClick.bind(this)}>
				<div><strong>Nombre:</strong> {this.props.class.title}</div>
				<div><strong>Profesores:</strong> {this._getInstructors()}</div>
				<div><strong>NRC:</strong> {this.props.class.nrc}</div>
				<div><strong>#Coreq:</strong> {this.props.class.coreq.length}</div>
			</div>
		);
	}
}
