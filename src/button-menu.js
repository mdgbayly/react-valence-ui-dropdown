
var React = require('react'),
	Menu = require('./menu'),
	classNames = require('classnames'),
	keys = require('./keys');

var ButtonMenu = React.createClass({

	getDefaultProps: function() {
		return {
			disabled: false,
			isPrimary: false,
			isTextVisible: true,
			items: []
		};
	},

	getInitialState: function() {
		return {
			isMenuVisible: false
		};
	},

	closeMenu: function(focusOpener) {
		this.setState({
			isMenuVisible: false
		});
		if (focusOpener) {
			this.focus();
		}
	},

	focus: function() {
		var button = React.findDOMNode(this).querySelector('button');
		button.focus();
	},

	handleBlur: function() {
		// this trick is necessary due to lack of support for e.relatedTarget
		setTimeout(function() {

			if (!this.state.isMenuVisible || !document.activeElement) {
				return;
			}

			var parentNode = document.activeElement.parentNode;
			var menuNode = React.findDOMNode(this);

			while (parentNode) {
				if (parentNode === menuNode) {
					return;
				}
				parentNode = parentNode.parentNode;
			}

			this.closeMenu(false);

		}.bind(this), 0);
	},

	handleKeyUp: function(e) {

		if ((e.keyCode !== keys.DOWN && e.keyCode !== keys.UP) || this.props.disabled) {
			return;
		}

		if (e.keyCode === keys.DOWN && !this.state.isMenuVisible) {
			this.setState({isMenuVisible: true});
		} else if (e.keyCode === keys.UP && this.state.isMenuVisible) {
			this.setState({isMenuVisible: false});
		}

	},

	handleKeyDown: function(e) {
		if (e.keyCode === keys.DOWN || e.keyCode === keys.UP) {
			// prevent scrolling when up/down arrows pressed
			e.preventDefault();
		}
	},

	toggleMenuVisibility: function() {
		if (this.props.disabled) {
			return;
		}
		this.setState({
			isMenuVisible: !this.state.isMenuVisible
		});
	},

	render: function() {

		if (!this.props.text || this.props.text.length === 0) {
			console.error("'text' is a required property of ButtonMenu."); //eslint-disable-line no-console
			return;
		}

		var buttonClass;
		if (this.props.openerClassName) {
			buttonClass = this.props.openerClassName;
		} else {
			buttonClass = classNames({
				'vui-button-menu': true,
				'vui-button-menu-primary': this.props.isPrimary
			});
		}

		var contentClass = classNames({
			'vui-button-menu-content': true,
			'vui-button-menu-text-hidden': !this.props.isTextVisible
		});

		var opener = React.createElement(
			'button', {
				'aria-haspopup': 'true',
				className: buttonClass,
				disabled: this.props.disabled,
				onClick: this.toggleMenuVisibility,
				onKeyDown: this.handleKeyDown,
				onKeyUp: this.handleKeyUp
			},
			React.createElement(
				'span', { className: contentClass },
				React.createElement(
					'span',
					{},
					this.props.text
				)
			)
		);

		var menu = React.createElement(
			Menu, {
				closeCallback: this.closeMenu,
				items: this.props.items,
				isVisible: this.state.isMenuVisible
			}
		);

		return React.createElement(
			'div', {
				className: 'vui-dropdown',
				onBlur: this.handleBlur
			},
			[ opener, menu ]
		);

	}

});

module.exports = ButtonMenu;
