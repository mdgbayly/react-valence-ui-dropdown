var React = require('react'),
	MenuItem = require('./menuItem');

var MenuList = React.createClass({

	render: function() {
		return (
			<ul className="dropdown-list-show">
				{this.renderListItems()}
			</ul>
		);
	},

	renderListItems: function() {
		var items = [];
		if (this.props.items) {
			for (var i = 0; i < this.props.items.length; i++) {
				var item = this.props.items[i];
				items.push(<li><MenuItem text={item.text} onClick={item.onClick} disabled={item.disabled} /></li>);
			}
		}
		return items;
	}
});

module.exports = MenuList;
