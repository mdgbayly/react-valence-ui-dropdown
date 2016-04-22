'use strict';

jest.dontMock('../../src/button-menu');

var React = require('react'),
	ReactDOM = require('react-dom'),
	TestUtils = require('react-addons-test-utils'),
	ButtonMenu = require('../../index').ButtonMenu;

describe('button-menu', function() {

	var items = [
		{
			text: 'First menu item',
			action: function() {}
		},
		{
			text: 'Second menu item',
			isEnabled: false,
			action: function() {}
		}
	];

	it('has class name', function() {

		var buttonMenu = TestUtils.renderIntoDocument(
			<ButtonMenu text="Stuff" items={items}/>
		);

		expect(ReactDOM.findDOMNode(buttonMenu).className)
			.toBe('vui-dropdown-button');

		expect(ReactDOM.findDOMNode(buttonMenu).firstChild.className)
			.toBe('vui-button-menu');

	});

	it ('displays provided text in button', function() {

		var buttonMenu = TestUtils.renderIntoDocument(
			<ButtonMenu text="Stuff" />
		);

		expect(ReactDOM.findDOMNode(buttonMenu).firstChild.firstChild.firstChild.textContent)
			.toBe("Stuff");

	});

	describe('primary', function() {

		it('has class name', function() {

			var buttonMenu = TestUtils.renderIntoDocument(
				<ButtonMenu text="Stuff" isPrimary={true} items={items}/>
			);

			expect(ReactDOM.findDOMNode(buttonMenu).firstChild.className)
				.toBe('vui-button-menu vui-button-menu-primary');

		});

	});

});
