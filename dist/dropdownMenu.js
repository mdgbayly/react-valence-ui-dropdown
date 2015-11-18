'use strict';

var React = require('react'),
    MenuList = require('./menuList');

var Menu = React.createClass({
	displayName: 'Menu',

	getInitialState: function getInitialState() {
		return {
			isListVisible: false
		};
	},

	show: function show() {
		this.setState({
			isListVisible: true
		});
		document.addEventListener('click', this.hide);
	},

	hide: function hide() {
		this.setState({
			isListVisible: false
		});
		document.removeEventListener('click', this.hide);
	},

	render: function render() {
		return React.createElement(
			'div',
			{ className: 'dropdown-arrow-icon', onClick: this.show },
			React.createElement(MenuList, { isListVisible: this.state.isListVisible, items: this.props.items })
		);
	}
});

module.exports = Menu;