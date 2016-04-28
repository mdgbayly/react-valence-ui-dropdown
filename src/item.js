var React = require('react'),
	classNames = require('classnames'),
	keys = require('./keys');

var Item = React.createClass( {

	getInitialState: function() {
		return {
			isFocused: false
		};
	},

	handleFocus: function() {
		this.setState({ isFocused: true });
	},

	handleBlur: function() {
		this.setState({ isFocused: false });
	},

	handleKeyUp: function(e) {

		if (e.keyCode !== keys.SPACE || this.props.isEnabled === false) {
			return;
		}

		this.props.action();

	},

	render: function() {

		var isEnabled = (this.props.isEnabled !== false);

		var image = React.createElement(
			'span'
		);

		var link = React.createElement(
			'a', {
				'aria-disabled': !isEnabled,
				href: 'javascript:void(0);',
				onClick: isEnabled ? this.props.action : null,
				onFocus: this.handleFocus,
				onBlur: this.handleBlur,
				onKeyUp: this.handleKeyUp,
				tabIndex: -1
			},
			this.props.text
		);

		var itemClass = classNames({
			'vui-dropdown-menu-item': true,
			'vui-dropdown-menu-item-disabled': !isEnabled,
			'vui-dropdown-menu-item-focus': this.state.isFocused
		});

		var listItemProps = {
			className: itemClass,
			role: 'menuitem'
		};

		if (typeof this.props.ownProps === 'object') {
			for (var k in this.props.ownProps) {
				listItemProps[k] = this.props.ownProps[k];
			}
		}

		return React.createElement(
			'li',
			listItemProps,
			image,
			link
		);

	}

} );

Item.tryGetFocusableElement = function(itemNode) {
	if (!itemNode.childNodes[1] || !itemNode.childNodes[1].focus) {
		return false;
	}
	return itemNode.childNodes[1];
};

module.exports = Item;
