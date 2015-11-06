'use strict';

var React = require('react'),
    MenuItem = require('./menuItem');

var MenuList = React.createClass({
	displayName: 'MenuList',

	render: function render() {
		return React.createElement(
			'ul',
			{ className: 'dropdown-list-show' },
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
					React.createElement(MenuItem, { text: item.text, onClick: item.onClick, disabled: item.disabled })
				));
			}
		}
		return items;
	}
});

module.exports = MenuList;