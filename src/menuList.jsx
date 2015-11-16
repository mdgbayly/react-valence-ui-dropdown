'use strict';

var React = require('react'),
	MenuItem = require('./menuItem');

var MenuList = React.createClass({

	propTypes: {
		isListVisible: React.PropTypes.bool
	},

	render: function() {
		var listClassName;
		if (this.props.isListVisible) {
			listClassName = 'dropdown-list-show';
		} else {
			listClassName = 'dropdown-list-hidden';
		}
		return (
			<ul className={listClassName}>
				{this.renderListItems()}
			</ul>
		);
	},

	renderListItems: function() {
		var items = [];
		if (this.props.items) {
			for (var i = 0; i < this.props.items.length; i++) {
				var item = this.props.items[i];
				items.push(<li><MenuItem text={item.text} onClick={item.onClick} isDisabled={item.isDisabled} /></li>);
			}
		}
		return items;
	}
});

module.exports = MenuList;
