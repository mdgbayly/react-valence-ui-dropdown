var React = require('react'),
	classNames = require('classnames');

var MenuItem = React.createClass({

	propTypes: {
		id: React.PropTypes.number,
		text: React.PropTypes.string,
		isDisabled: React.PropTypes.bool,
		isSelected: React.PropTypes.bool,
		selectFocus: React.PropTypes.func
	},

	getDefaultProps: function() {
		return {
			isDisabled: false,
			isSelected: false
		};
	},

	componentDidUpdate: function() {
		if ( this.props.isSelected ) {
			React.findDOMNode( this.refs.listItem ).focus();
		}
	},

	select: function( event ) {
		if ( !this.props.isDisabled ) {
			this.props.onClick();
		}
		event.stopPropagation();
	},

	onMouseMove: function() {
		if ( this.props.selectFocus && !this.props.isSelected ) {
			this.props.selectFocus( this.props.id );
		}
	},

	render: function() {
		var className = classNames( 'dropdown-item', { disabled: this.props.isDisabled }, { selected: this.props.isSelected } );
		return (
			<li
				ref = "listItem"
				className = { className }
				onClick = { this.select }
				role = "menuitem"
				tabIndex = "-1"
				onMouseMove = { this.onMouseMove }
				aria-disabled = {this.props.isDisabled}
			>
				{ this.props.text }
			</li>
		);
	}
});

module.exports = MenuItem;
