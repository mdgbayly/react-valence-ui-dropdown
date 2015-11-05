'use strict';

var React = require('react'),
    MenuList = require('./menuList');

var Menu = React.createClass({
	displayName: 'Menu',

	getInitialState: function getInitialState() {
		return {
			listVisible: false
		};
	},

	show: function show() {
		this.setState({
			listVisible: true
		});
		document.addEventListener('click', this.hide);
	},

	hide: function hide() {
		this.setState({
			listVisible: false
		});
		document.removeEventListener('click', this.hide);
	},

	render: function render() {
		var listClassName;
		if (this.state.listVisible) {
			listClassName = '';
		} else {
			listClassName = 'dropdown-list-hide';
		}

		return React.createElement(
			'div',
			{ className: 'dropdown-arrow-icon', onClick: this.show },
			React.createElement(
				'div',
				{ className: listClassName },
				React.createElement(MenuList, { items: this.props.items })
			)
		);
	}
});

module.exports = Menu;