(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.reactVuiDropdown = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var dropdown = require('./src/dropdown');

module.exports = dropdown;

},{"./src/dropdown":3}],2:[function(require,module,exports){
/*!
  Copyright (c) 2015 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes += ' ' + arg;
			} else if (Array.isArray(arg)) {
				classes += ' ' + classNames.apply(null, arg);
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes += ' ' + key;
					}
				}
			}
		}

		return classes.substr(1);
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],3:[function(require,module,exports){
'use strict';

var React = require('react'),
    Menu = require('./menu'),
    classNames = require('classnames'),
    keys = require('./keys');

var Dropdown = React.createClass({
	displayName: 'Dropdown',

	getDefaultProps: function getDefaultProps() {
		return {
			disabled: false,
			isPrimary: false,
			isTextVisible: true,
			items: []
		};
	},

	getInitialState: function getInitialState() {
		return {
			isMenuVisible: false
		};
	},

	closeMenu: function closeMenu(focusOpener) {
		this.setState({
			isMenuVisible: false
		});
		if (focusOpener) {
			this.focus();
		}
	},

	focus: function focus() {
		var button = React.findDOMNode(this).querySelector('button');
		button.focus();
	},

	handleBlur: function handleBlur() {
		// this trick is necessary due to lack of support for e.relatedTarget
		setTimeout((function () {

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
		}).bind(this), 0);
	},

	handleKeyUp: function handleKeyUp(e) {

		if (e.keyCode !== keys.DOWN && e.keyCode !== keys.UP || this.props.disabled) {
			return;
		}

		if (e.keyCode === keys.DOWN && !this.state.isMenuVisible) {
			this.setState({ isMenuVisible: true });
		} else if (e.keyCode === keys.UP && this.state.isMenuVisible) {
			this.setState({ isMenuVisible: false });
		}
	},

	handleKeyDown: function handleKeyDown(e) {
		if (e.keyCode === keys.DOWN || e.keyCode === keys.UP) {
			// prevent scrolling when up/down arrows pressed
			e.preventDefault();
		}
	},

	toggleMenuVisibility: function toggleMenuVisibility() {
		if (this.props.disabled) {
			return;
		}
		this.setState({
			isMenuVisible: !this.state.isMenuVisible
		});
	},

	render: function render() {

		if (!this.props.text || this.props.text.length === 0) {
			console.error("'text' is a required property of Dropdown."); //eslint-disable-line no-console
			return;
		}

		var contentClass = classNames({
			'vui-dropdown-text': true,
			'vui-dropdown-text-hidden': !this.props.isTextVisible
		});

		var menu = React.createElement(Menu, {
			closeCallback: this.closeMenu,
			items: this.props.items,
			isVisible: this.state.isMenuVisible
		});

		var button = React.createElement('button', {
			'aria-haspopup': 'true',
			disabled: this.props.disabled,
			onClick: this.toggleMenuVisibility,
			onKeyDown: this.handleKeyDown,
			onKeyUp: this.handleKeyUp
		}, React.createElement('span', { className: contentClass }, React.createElement('span', {}, this.props.text)));

		var className = classNames({
			'vui-dropdown': true,
			'vui-dropdown-primary': this.props.isPrimary
		});

		return React.createElement('div', {
			className: className,
			onBlur: this.handleBlur
		}, [button, menu]);
	}

});

module.exports = Dropdown;

},{"./keys":5,"./menu":6,"classnames":2,"react":"react"}],4:[function(require,module,exports){
'use strict';

var React = require('react'),
    classNames = require('classnames'),
    keys = require('./keys');

var Item = React.createClass({
	displayName: 'Item',

	getInitialState: function getInitialState() {
		return {
			isFocused: false
		};
	},

	handleFocus: function handleFocus() {
		this.setState({ isFocused: true });
	},

	handleBlur: function handleBlur() {
		this.setState({ isFocused: false });
	},

	handleKeyUp: function handleKeyUp(e) {

		if (e.keyCode !== keys.SPACE || this.props.isEnabled === false) {
			return;
		}

		this.props.action();
	},

	render: function render() {

		var isEnabled = this.props.isEnabled !== false;

		var link = React.createElement('a', {
			'aria-disabled': !isEnabled,
			href: isEnabled ? 'javascript:void(0);' : null,
			onClick: isEnabled ? this.props.action : null,
			onFocus: this.handleFocus,
			onBlur: this.handleBlur,
			onKeyUp: this.handleKeyUp,
			tabIndex: -1
		}, this.props.text);

		var itemClass = classNames({
			'vui-dropdown-menu-item': true,
			'vui-dropdown-menu-item-disabled': !isEnabled,
			'vui-dropdown-menu-item-focus': this.state.isFocused
		});

		return React.createElement('li', {
			className: itemClass,
			role: 'menuitem'
		}, link);
	}

});

Item.getFocusableElement = function (itemNode) {
	return itemNode.firstChild;
};

module.exports = Item;

},{"./keys":5,"classnames":2,"react":"react"}],5:[function(require,module,exports){
"use strict";

module.exports = {
	ENTER: 13,
	ESCAPE: 27,
	SPACE: 32,
	UP: 38,
	DOWN: 40
};

},{}],6:[function(require,module,exports){
'use strict';

var React = require('react'),
    Item = require('./item'),
    classNames = require('classnames'),
    keys = require('./keys');

var Menu = React.createClass({
	displayName: 'Menu',

	componentDidUpdate: function componentDidUpdate(prevProps) {
		if (!prevProps.isVisible && this.props.isVisible) {

			var firstItem = React.findDOMNode(this).querySelector('ul > li');
			if (!firstItem) {
				return;
			}

			Item.getFocusableElement(firstItem).focus();
		}
	},

	handleKeyUp: function handleKeyUp(e) {

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

	handleKeyDown: function handleKeyDown(e) {
		if (e.keyCode === keys.DOWN || e.keyCode === keys.UP) {
			// prevent scrolling when up/down arrows pressed
			e.preventDefault();
		}
	},

	render: function render() {

		var menuClass = classNames({
			'vui-dropdown-menu': true,
			'vui-dropdown-menu-visible': this.props.isVisible
		});

		var items = this.props.items ? this.props.items : [];

		var list = React.createElement('ul', {}, items.map((function (item) {
			return React.createElement(Item, {
				action: (function () {
					if (item.isEnabled === false) {
						return;
					}
					this.props.closeCallback(true);
					item.action();
				}).bind(this),
				isEnabled: item.isEnabled,
				text: item.text
			});
		}).bind(this)));

		return React.createElement('div', {
			className: menuClass,
			onKeyDown: this.handleKeyDown,
			onKeyUp: this.handleKeyUp,
			role: 'menu'
		}, list);
	}

});

module.exports = Menu;

},{"./item":4,"./keys":5,"classnames":2,"react":"react"}]},{},[1])(1)
});
//# sourceMappingURL=react-vui-dropdown.js.map
