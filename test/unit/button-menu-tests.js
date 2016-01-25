'use strict';

jest.dontMock('../../src/button-menu');
jest.dontMock('../../src/menu');
jest.dontMock('../../src/item');

var React = require('react'),
	ReactDOM = require('react-dom'),
	TestUtils = require('react-addons-test-utils'),
	keys = require('../../src/keys'),
	ButtonMenu = require('../../index').ButtonMenu;

describe('button-menu', function() {

	var testAction = function() {

	};

	var items = [
		{
			text: 'First menu item',
			action: testAction
		},
		{
			text: 'Second menu item',
			isEnabled: false,
			action: testAction
		}
	];

	it('has class name', function() {

		var buttonMenu = TestUtils.renderIntoDocument(
			<ButtonMenu text="Stuff" items={items}/>
		);

		expect(ReactDOM.findDOMNode(buttonMenu).className)
			.toBe('vui-dropdown');

		expect(ReactDOM.findDOMNode(buttonMenu).firstChild.className)
			.toBe('vui-button-menu');

	});

	it('has aria haspopup attribute', function() {

		var buttonMenu = TestUtils.renderIntoDocument(
			<ButtonMenu text="Stuff" />
		);

		expect(ReactDOM.findDOMNode(buttonMenu).firstChild.getAttribute('aria-haspopup'))
			.toBe('true');

	});

	it('has hidden menu', function() {

		var buttonMenu = TestUtils.renderIntoDocument(
			<ButtonMenu text="Stuff" />
		);

		expect(buttonMenu.state.isMenuVisible).toBe(false);

	});

	it('opens when mouse is clicked', function() {

		var buttonMenu = TestUtils.renderIntoDocument(
			<ButtonMenu text="Stuff" />
		);

		TestUtils.Simulate.click(
			ReactDOM.findDOMNode(buttonMenu).firstChild
		);

		expect(buttonMenu.state.isMenuVisible).toBe(true);

	});

	it('does not open when disabled button is clicked', function() {

		var buttonMenu = TestUtils.renderIntoDocument(
			<ButtonMenu text="Stuff" disabled />
		);

		TestUtils.Simulate.click(
			ReactDOM.findDOMNode(buttonMenu).firstChild
		);

		expect(buttonMenu.state.isMenuVisible).toBe(false);

	});

	it ('opens when down arrow is pressed', function() {

		var buttonMenu = TestUtils.renderIntoDocument(
			<ButtonMenu text="Stuff" />
		);

		TestUtils.Simulate.keyUp(
			ReactDOM.findDOMNode(buttonMenu).firstChild, 
			{keyCode: keys.DOWN}
		);

		expect(buttonMenu.state.isMenuVisible).toBe(true);

	});

	it ('does not open if disabled and down arrow is pressed', function() {

		var buttonMenu = TestUtils.renderIntoDocument(
			<ButtonMenu text="Stuff" disabled />
		);

		TestUtils.Simulate.keyUp(
			ReactDOM.findDOMNode(buttonMenu).firstChild, 
			{keyCode: keys.DOWN}
		);

		expect(buttonMenu.state.isMenuVisible).toBe(false);

	});

	it ('does not open if disabled and toggleMenuVisibility is called', function() {

		var buttonMenu = TestUtils.renderIntoDocument(
			<ButtonMenu text="Stuff" disabled />
		);

		buttonMenu.toggleMenuVisibility();

		expect(buttonMenu.state.isMenuVisible).toBe(false);

	});

	it ('closes when up arrow is pressed', function() {

		var buttonMenu = TestUtils.renderIntoDocument(
			<ButtonMenu text="Stuff" />
		);

		TestUtils.Simulate.keyUp(
			ReactDOM.findDOMNode(buttonMenu).firstChild, 
			{keyCode: keys.DOWN}
		);

		expect(buttonMenu.state.isMenuVisible).toBe(true);

		TestUtils.Simulate.keyUp(
			ReactDOM.findDOMNode(buttonMenu).firstChild, 
			{keyCode: keys.UP}
		);

		expect(buttonMenu.state.isMenuVisible).toBe(false);

	});

	it('closes when escape key is pressed', function() {

		var buttonMenu = TestUtils.renderIntoDocument(
			<ButtonMenu text="Stuff" items={items}/>
		);

		TestUtils.Simulate.keyUp(
			ReactDOM.findDOMNode(buttonMenu).firstChild, 
			{keyCode: keys.DOWN}
		);

		expect(buttonMenu.state.isMenuVisible).toBe(true);

		TestUtils.Simulate.keyUp(
			ReactDOM.findDOMNode(buttonMenu).childNodes[1], 
			{keyCode: keys.ESCAPE}
		);

		expect(buttonMenu.state.isMenuVisible).toBe(false);

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
