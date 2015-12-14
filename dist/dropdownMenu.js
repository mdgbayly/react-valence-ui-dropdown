'use strict';

var React = require('react'),
    MenuList = require('./menuList'),
    keys = require('./keys');

var Menu = React.createClass({
	displayName: 'Menu',

	componentDidMount: function componentDidMount() {
		React.findDOMNode(this.refs.menuButton).addEventListener('blur', this.onBlur, true);
	},

	componentWillUnmount: function componentWillUnmount() {
		React.findDOMNode(this.refs.menuButton).removeEventListener('blur', this.onBlur, true);
	},

	getInitialState: function getInitialState() {
		return {
			isListVisible: false,
			selectedItem: -1
		};
	},

	show: function show() {
		var focusFirstItem = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

		this.setState({
			isListVisible: true,
			selectedItem: focusFirstItem ? 0 : -1
		});
		document.addEventListener('click', this.hide);
	},

	hide: function hide() {
		this.setState({
			isListVisible: false,
			selectedItem: -1
		});
		document.removeEventListener('click', this.hide);
	},

	onClick: function onClick() {
		this.show();
	},

	handleKeyDown: function handleKeyDown(event) {
		if (event.keyCode === keys.ENTER || event.keyCode === keys.SPACE) {
			if (this.state.isListVisible) {
				this.selectItem();
				this.hide();
				React.findDOMNode(this.refs.menuButton).focus();
			} else {
				this.show();
			}
		} else if (event.keyCode === keys.ESCAPE) {
			this.hide();
			React.findDOMNode(this.refs.menuButton).focus();
		} else if (event.keyCode === keys.DOWN) {
			if (!this.state.isListVisible) {
				this.show(true);
			} else {
				this.moveFocusDown();
			}
		} else if (event.keyCode === keys.UP) {
			this.moveFocusUp();
		}
	},

	moveFocusUp: function moveFocusUp() {
		var newIndex = this.state.selectedItem - 1;

		if (newIndex < 0) {
			newIndex = this.props.items.length - 1;
		}
		this.setState({
			selectedItem: newIndex
		});
	},

	moveFocusDown: function moveFocusDown() {
		var newIndex = this.state.selectedItem + 1;
		if (newIndex >= this.props.items.length) {
			newIndex = 0;
		}
		this.setState({
			selectedItem: newIndex
		});
	},

	selectItem: function selectItem() {
		if (this.state.selectedItem !== -1) {
			var menuItem = this.props.items[this.state.selectedItem];
			if (!menuItem.isDisabled) {
				menuItem.onClick();
			}
		}
	},

	selectFocus: function selectFocus(index) {
		if (this.state.selectedItem !== index) {
			this.setState({
				selectedItem: index
			});
		}
	},

	onBlur: function onBlur(event) {
		if (event.relatedTarget && event.relatedTarget.parentNode !== React.findDOMNode(this.refs.menuList)) {
			// losing focus and focus not in the menu list either
			this.hide();
		}
	},

	render: function render() {
		return React.createElement(
			'div',
			{
				className: 'dropdown-arrow-icon',
				onClick: this.onClick,
				onKeyDown: this.handleKeyDown,
				'aria-haspopup': true,
				role: 'button',
				'aria-expanded': this.state.isListVisible,
				tabIndex: '0',
				ref: 'menuButton'
			},
			React.createElement(MenuList, {
				closeMenu: this.hide,
				isListVisible: this.state.isListVisible,
				items: this.props.items,
				selectedItem: this.state.selectedItem,
				role: 'menu',
				'aria-visible': this.state.isListVisible,
				selectFocus: this.selectFocus,
				ref: 'menuList'
			})
		);
	}
});

module.exports = Menu;