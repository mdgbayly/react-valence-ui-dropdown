'use strict';

var React = require('react'),
    MenuItem = require('./menuItem');

var MenuList = React.createClass({
	displayName: 'MenuList',

	propTypes: {
		isListVisible: React.PropTypes.bool,
		menuItems: React.PropTypes.array,
		selectedItem: React.PropTypes.number,
		selectFocus: React.PropTypes.func
	},

	selectItem: function selectItem() {
		if (this.props.selectedItem !== -1) {
			var listNode = React.findDOMNode(this.refs.menuList);
			listNode.children[this.props.selectedItem].click();
		}
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
			{ className: listClassName, ref: 'menuList', role: 'menulist', 'aria-visible': this.props.isListVisible },
			this.renderListItems()
		);
	},

	renderListItems: function renderListItems() {
		var items = [];
		if (this.props.items) {
			for (var i = 0; i < this.props.items.length; i++) {
				var item = this.props.items[i];
				items.push(React.createElement(MenuItem, {
					text: item.text,
					onClick: item.onClick,
					isDisabled: item.isDisabled,
					isSelected: i === this.props.selectedItem,
					selectFocus: this.props.selectFocus,
					id: i
				}));
			}
		}
		return items;
	}
});

module.exports = MenuList;