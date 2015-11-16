'use strict';

var React = require('react'),
	classNames = require('classnames');

var MenuItem = React.createClass({

	propTypes: {
		text: React.PropTypes.string,
		onClick: React.PropTypes.func,
		isDisabled: React.PropTypes.bool
	},

	getDefaultProps: function() {
		return {
			isDisabled: false
		};
	},

	select: function( event ) {
		if ( !this.props.isDisabled ) {
			this.props.onClick();
		}
		event.stopPropagation();
	},

	render: function() {
		var className = classNames( 'dropdown-item', { disabled: this.props.isDisabled } );
		return (
			<div className={className} onClick={this.select} >
				{this.props.text}
			</div>
		);
	}
});

module.exports = MenuItem;
