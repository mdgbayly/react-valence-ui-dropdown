var React = require('react');

var Separator = React.createClass( {

	render: function() {

		return React.createElement(
			'li', {
				className: 'vui-dropdown-menu-item-separator',
				role: 'separator'
			}
		);

	}

} );

module.exports = Separator;
