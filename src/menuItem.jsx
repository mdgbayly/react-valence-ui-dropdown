'use strict';

var React = require('react'),
	classNames = require('classnames');

var MenuItem = React.createClass({

	propTypes: {
		text: React.PropTypes.stringValue,
		onClick: React.PropTypes.func,
		disabled: React.PropTypes.boolValue
	},

	getDefaultProps: function() {
		return {
			disabled: false
		};
	},

	select: function( event ) {
		if ( !this.props.disabled ) {
			this.props.onClick();
		}
		event.stopPropagation();
	},

	render: function() {
		var className = classNames( 'dropdown-item', { disabled: this.props.disabled } );
		return (
			<div className={className} onClick={this.select} >
				{this.props.text}
			</div>
		);
	}
});

module.exports = MenuItem;
