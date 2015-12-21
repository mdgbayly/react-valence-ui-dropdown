
var React = require('react'),
	Item = require('./item'),
	classNames = require('classnames'),
	keys = require('./keys');

var Menu = React.createClass( {

	componentDidUpdate: function(prevProps) {
		if (!prevProps.isVisible && this.props.isVisible) {

			var firstItem = React.findDOMNode(this).querySelector('ul > li');
			if (!firstItem) {
				return;
			}

			Item.getFocusableElement(firstItem).focus();

		}
	},

	handleKeyUp: function(e) {

		if (e.keyCode !== keys.DOWN && e.keyCode !== keys.UP && e.keyCode !== keys.ESCAPE) {
			return;
		}

		var parentNode = e.target.parentNode;
		if (e.keyCode === keys.DOWN) {
			if (parentNode.nextSibling) {
				Item.getFocusableElement(parentNode.nextSibling).focus();
			} else {
				Item.getFocusableElement(parentNode.parentNode.firstChild).focus();
			}
		} else if (e.keyCode === keys.UP) {
			if (parentNode.previousSibling) {
				Item.getFocusableElement(parentNode.previousSibling).focus();
			} else {
				Item.getFocusableElement(parentNode.parentNode.lastChild).focus();
			}
		} else if (e.keyCode === keys.ESCAPE) {
			this.props.closeCallback(true);
		}

		return;

	},

	handleKeyDown: function(e) {
		if (e.keyCode === keys.DOWN || e.keyCode === keys.UP) {
			// prevent scrolling when up/down arrows pressed
			e.preventDefault();
		}
	},

	render: function() {

		var menuClass = classNames({
			'vui-dropdown-menu': true,
			'vui-dropdown-menu-visible': this.props.isVisible
		});

		var items = this.props.items ? this.props.items : [];

		var list = React.createElement(
			'ul', {},
			items.map(function(item) {
				return React.createElement(
					Item, {
						action: function() {
							if (item.isEnabled === false) {
								return;
							}
							this.props.closeCallback(true);
							item.action();
						}.bind(this),
						isEnabled: item.isEnabled,
						text: item.text
					}
				);
			}.bind(this))
		);

		return React.createElement(
			'div', {
				className: menuClass,
				onKeyDown: this.handleKeyDown,
				onKeyUp: this.handleKeyUp,
				role: 'menu'
			},
			list
		);

	}

} );

module.exports = Menu;
