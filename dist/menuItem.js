'use strict';

var React = require('react'),
    classNames = require('classnames');

var MenuItem = React.createClass({
	displayName: 'MenuItem',

	propTypes: {
		text: React.PropTypes.string,
		onClick: React.PropTypes.func,
		isDisabled: React.PropTypes.bool
	},

	getDefaultProps: function getDefaultProps() {
		return {
			isDisabled: false
		};
	},

	select: function select(event) {
		if (!this.props.isDisabled) {
			this.props.onClick();
		}
		event.stopPropagation();
	},

	render: function render() {
		var className = classNames('dropdown-item', { disabled: this.props.isDisabled });
		return React.createElement(
			'div',
			{ className: className, onClick: this.select },
			this.props.text
		);
	}
});

module.exports = MenuItem;