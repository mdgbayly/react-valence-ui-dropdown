var React = require('react'),
	MenuList = require('./menuList');

var Menu = React.createClass( {
	getInitialState: function() {
		return {
			isListVisible: false
		};
	},

	show: function() {
		this.setState({
			isListVisible: true
		});
		document.addEventListener('click', this.hide);
	},

	hide: function() {
		this.setState({
			isListVisible: false
		});
		document.removeEventListener('click', this.hide);
	},

	render: function() {
		return (
			<div className="dropdown-arrow-icon" onClick={this.show}>
				<MenuList isListVisible={this.state.isListVisible} items={this.props.items}/>
			</div>
		);
	}
});

module.exports = Menu;
