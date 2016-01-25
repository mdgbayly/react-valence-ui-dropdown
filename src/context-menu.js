
var React = require('react'),
	ButtonMenu = require('./button-menu');

var ContextMenu = React.createClass({

	render: function() {

		return React.createElement(
				ButtonMenu, {
					disabled: this.props.disabled,
					isPrimary: false,
					isTextVisible: false,
					items: this.props.items,
					openerClassName: 'vui-context-menu',
					text: this.props.text
				}
			);

	}

});

module.exports = ContextMenu;
