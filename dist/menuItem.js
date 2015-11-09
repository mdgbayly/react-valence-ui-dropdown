'use strict';

var React = require('react'),
    classNames = require('classnames');

var MenuItem = React.createClass({
	displayName: 'MenuItem',

	propTypes: {
		text: React.PropTypes.string,
		onClick: React.PropTypes.func,
		disabled: React.PropTypes.bool
	},

	getDefaultProps: function getDefaultProps() {
		return {
			disabled: false
		};
	},

	select: function select(event) {
		if (!this.props.disabled) {
			this.props.onClick();
		}
		event.stopPropagation();
	},

	render: function render() {
		var className = classNames('dropdown-item', { disabled: this.props.disabled });
		return React.createElement(
			'div',
			{ className: className, onClick: this.select },
			this.props.text
		);
	}
});

module.exports = MenuItem;