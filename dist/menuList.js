'use strict';

var React = require('react'),
    MenuItem = require('./menuItem');

var MenuList = React.createClass({
	displayName: 'MenuList',

	propTypes: {
		isListVisible: React.PropTypes.bool
	},

	render: function render() {
		var listClassName;
		if (this.props.isListVisible) {
			listClassName = 'dropdown-list-show';
		} else {
			listClassName = 'dropdown-list-hidden';
		}
		return React.createElement(
			'ul',
			{ className: listClassName },
			this.renderListItems()
		);
	},

	renderListItems: function renderListItems() {
		var items = [];
		if (this.props.items) {
			for (var i = 0; i < this.props.items.length; i++) {
				var item = this.props.items[i];
				items.push(React.createElement(
					'li',
					null,
					React.createElement(MenuItem, { text: item.text, onClick: item.onClick, isDisabled: item.isDisabled })
				));
			}
		}
		return items;
	}
});

module.exports = MenuList;