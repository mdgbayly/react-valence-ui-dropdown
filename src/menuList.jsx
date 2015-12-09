var React = require('react'),
	MenuItem = require('./menuItem');

var MenuList = React.createClass({

	propTypes: {
		isListVisible: React.PropTypes.bool,
		menuItems: React.PropTypes.array,
		selectedItem: React.PropTypes.number,
		selectFocus: React.PropTypes.func
	},

	selectItem: function() {
		if ( this.props.selectedItem !== -1 ) {
			var listNode = React.findDOMNode( this.refs.menuList );
			listNode.children[this.props.selectedItem].click();
		}
	},

	render: function() {
		var listClassName;
		if ( this.props.isListVisible ) {
			listClassName = 'dropdown-list-show';
		} else {
			listClassName = 'dropdown-list-hidden';
		}
		return (
			<ul className={listClassName} ref="menuList" role="menulist" aria-visible={this.props.isListVisible}>
				{ this.renderListItems() }
			</ul>
		);
	},

	renderListItems: function() {
		var items = [];
		if ( this.props.items ) {
			for (var i = 0; i < this.props.items.length; i++) {
				var item = this.props.items[i];
				items.push(
					<MenuItem
						text = { item.text }
						onClick = { item.onClick }
						isDisabled = { item.isDisabled }
						isSelected = { i === this.props.selectedItem }
						selectFocus = { this.props.selectFocus }
						id = { i }
					/>);
			}
		}
		return items;
	}
});

module.exports = MenuList;
