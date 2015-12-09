'use strict';

var React = require('react'),
    classNames = require('classnames');

var MenuItem = React.createClass({
	displayName: 'MenuItem',

	propTypes: {
		id: React.PropTypes.number,
		text: React.PropTypes.string,
		isDisabled: React.PropTypes.bool,
		isSelected: React.PropTypes.bool,
		selectFocus: React.PropTypes.func
	},

	getDefaultProps: function getDefaultProps() {
		return {
			isDisabled: false,
			isSelected: false
		};
	},

	componentDidUpdate: function componentDidUpdate() {
		if (this.props.isSelected) {
			React.findDOMNode(this.refs.listItem).focus();
		}
	},

	select: function select(event) {
		if (!this.props.isDisabled) {
			this.props.onClick();
		}
		event.stopPropagation();
	},

	onMouseMove: function onMouseMove() {
		if (this.props.selectFocus && !this.props.isSelected) {
			this.props.selectFocus(this.props.id);
		}
	},

	render: function render() {
		var className = classNames('dropdown-item', { disabled: this.props.isDisabled }, { selected: this.props.isSelected });
		return React.createElement(
			'li',
			{
				ref: 'listItem',
				className: className,
				onClick: this.select,
				role: 'menuitem',
				tabIndex: '-1',
				onMouseMove: this.onMouseMove,
				'aria-disabled': this.props.isDisabled
			},
			this.props.text
		);
	}
});

module.exports = MenuItem;