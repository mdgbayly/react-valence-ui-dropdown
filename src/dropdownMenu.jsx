var React = require('react'),
	MenuList = require('./menuList'),
	keys = require('./keys');

var Menu = React.createClass( {
	componentDidMount: function() {
		React.findDOMNode(this.refs.menuButton).addEventListener('blur', this.onBlur, true);
	},

	componentWillUnmount: function() {
		React.findDOMNode(this.refs.menuButton).removeEventListener('blur', this.onBlur, true);
	},

	getInitialState: function() {
		return {
			isListVisible: false,
			selectedItem: -1
		};
	},

	show: function( focusFirstItem = false) {
		this.setState({
			isListVisible: true,
			selectedItem: focusFirstItem ? 0 : -1
		});
		document.addEventListener('click', this.hide);
	},

	hide: function() {
		this.setState({
			isListVisible: false,
			selectedItem: -1
		});
		document.removeEventListener('click', this.hide);
	},

	onClick: function() {
		this.show( );
	},

	handleKeyDown: function( event ) {
		if (event.keyCode === keys.ENTER || event.keyCode === keys.SPACE) {
			if (this.state.isListVisible) {
				this.selectItem();
			} else {
				this.show();
			}
		} else if (event.keyCode === keys.ESCAPE ) {
			this.hide();
			React.findDOMNode(this.refs.menuButton).focus();
		} else if ( event.keyCode === keys.DOWN ) {
			if (!this.state.isListVisible) {
				this.show( true );
			} else {
				this.moveFocusDown();
			}
		} else if ( event.keyCode === keys.UP ) {
			this.moveFocusUp();
		}
	},

	moveFocusUp: function(  ) {
		var newIndex = this.state.selectedItem - 1;

		if ( newIndex < 0 ) {
			newIndex = this.props.items.length - 1;
		}
		this.setState(
			{
				selectedItem: newIndex
			}
		);
	},

	moveFocusDown: function(  ) {
		var newIndex = this.state.selectedItem + 1;
		if ( newIndex >= this.props.items.length) {
			newIndex = 0;
		}
		this.setState(
			{
				selectedItem: newIndex
			}
		);
	},

	selectItem: function() {
		this.refs.menuList.selectItem();

	},

	selectFocus: function(index) {
		if (this.state.selectedItem !== index) {
			this.setState(
				{
					selectedItem: index
				}
			);
		}
	},

	onBlur: function( event ) {
		if ( event.relatedTarget && event.relatedTarget.parentNode !== React.findDOMNode(this.refs.menuList)) {
			// losing focus and focus not in the menu list either
			this.hide();
		}
	},

	render: function() {
		return (
			<div
				className = "dropdown-arrow-icon"
				onClick = { this.onClick }
				onKeyDown = { this.handleKeyDown }
				aria-haspopup = { true }
				role = "button"
				aria-expanded = { this.state.isListVisible }
				tabIndex = "0"
				ref = "menuButton"
			>
				<MenuList
					closeMenu = { this.hide }
					isListVisible = { this.state.isListVisible }
					items = { this.props.items }
					selectedItem = { this.state.selectedItem }
					role = "menu"
					aria-visible = { this.state.isListVisible }
					selectFocus = { this.selectFocus }
					ref = "menuList"
				/>
			</div>
		);
	}
});

module.exports = Menu;
