'use strict';

var React = require('react'),
	MenuList = require('./menuList');

var Menu = React.createClass( {
	getInitialState: function() {
		return {
			listVisible: false
		};
	},

	show: function() {
		this.setState({
			listVisible: true
		});
		document.addEventListener('click', this.hide);
	},

	hide: function() {
		this.setState({
			listVisible: false
		});
		document.removeEventListener('click', this.hide);
	},

	render: function() {
		var listClassName;
		if (this.state.listVisible) {
			listClassName = '';
		} else {
			listClassName = 'dropdown-list-hide';
		}

		return (
			<div className="dropdown-arrow-icon" onClick={this.show}>
				<div className={listClassName}>
					<MenuList items={this.props.items}/>
				</div>
			</div>
		);
	}
});

module.exports = Menu;
