'use strict';

jest.dontMock('../../src/dropdown');
jest.dontMock('../../src/menu');
jest.dontMock('../../src/item');

var React = require('react'),
	ReactDOM = require('react-dom'),
	TestUtils = require('react-addons-test-utils'),
	keys = require('../../src/keys'),
	Dropdown = require('../../index');

describe('dropdown', function() {

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

		var dropdown = TestUtils.renderIntoDocument(
			<Dropdown items={items}/>
		);

		expect(ReactDOM.findDOMNode(dropdown).className)
			.toBe('vui-dropdown');

	});

	it('has aria haspopup attribute', function() {

		var dropdown = TestUtils.renderIntoDocument(
			<Dropdown />
		);

		expect(ReactDOM.findDOMNode(dropdown).firstChild.getAttribute('aria-haspopup'))
			.toBe('true');

	});

	it('has hidden menu', function() {

		var dropdown = TestUtils.renderIntoDocument(
			<Dropdown />
		);

		expect(dropdown.state.isMenuVisible).toBe(false);

	});

	it('opens when mouse is clicked', function() {

		var dropdown = TestUtils.renderIntoDocument(
			<Dropdown />
		);

		TestUtils.Simulate.click(
			ReactDOM.findDOMNode(dropdown).firstChild
		);

		expect(dropdown.state.isMenuVisible).toBe(true);

	});

	it('does not open when disabled button is clicked', function() {

		var dropdown = TestUtils.renderIntoDocument(
			<Dropdown disabled />
		);

		TestUtils.Simulate.click(
			ReactDOM.findDOMNode(dropdown).firstChild
		);

		expect(dropdown.state.isMenuVisible).toBe(false);

	});

	it ('opens when down arrow is pressed', function() {

		var dropdown = TestUtils.renderIntoDocument(
			<Dropdown />
		);

		TestUtils.Simulate.keyUp(
			ReactDOM.findDOMNode(dropdown).firstChild, 
			{keyCode: keys.DOWN}
		);

		expect(dropdown.state.isMenuVisible).toBe(true);

	});

	it ('does not open if disabled and down arrow is pressed', function() {

		var dropdown = TestUtils.renderIntoDocument(
			<Dropdown disabled />
		);

		TestUtils.Simulate.keyUp(
			ReactDOM.findDOMNode(dropdown).firstChild, 
			{keyCode: keys.DOWN}
		);

		expect(dropdown.state.isMenuVisible).toBe(false);

	});

	it ('does not open if disabled and toggleMenuVisibility is called', function() {

		var dropdown = TestUtils.renderIntoDocument(
			<Dropdown disabled />
		);

		dropdown.toggleMenuVisibility();

		expect(dropdown.state.isMenuVisible).toBe(false);

	});

	it ('closes when up arrow is pressed', function() {

		var dropdown = TestUtils.renderIntoDocument(
			<Dropdown />
		);

		TestUtils.Simulate.keyUp(
			ReactDOM.findDOMNode(dropdown).firstChild, 
			{keyCode: keys.DOWN}
		);

		expect(dropdown.state.isMenuVisible).toBe(true);

		TestUtils.Simulate.keyUp(
			ReactDOM.findDOMNode(dropdown).firstChild, 
			{keyCode: keys.UP}
		);

		expect(dropdown.state.isMenuVisible).toBe(false);

	});

	it('closes when escape key is pressed', function() {

		var dropdown = TestUtils.renderIntoDocument(
			<Dropdown items={items}/>
		);

		TestUtils.Simulate.keyUp(
			ReactDOM.findDOMNode(dropdown).firstChild, 
			{keyCode: keys.DOWN}
		);

		expect(dropdown.state.isMenuVisible).toBe(true);

		TestUtils.Simulate.keyUp(
			ReactDOM.findDOMNode(dropdown).childNodes[1], 
			{keyCode: keys.ESCAPE}
		);

		expect(dropdown.state.isMenuVisible).toBe(false);

	});

	it ('displays provided text in button', function() {

		var dropdown = TestUtils.renderIntoDocument(
			<Dropdown text="Stuff" />
		);

		expect(ReactDOM.findDOMNode(dropdown).firstChild.firstChild.textContent)
			.toBe("Stuff");

	});

	it ('displays no text in button', function() {

		var dropdown = TestUtils.renderIntoDocument(
			<Dropdown />
		);

		expect(ReactDOM.findDOMNode(dropdown).firstChild.firstChild.textContent)
			.toBe("");

	});

	describe('primary', function() {

		it('has class name', function() {

			var dropdown = TestUtils.renderIntoDocument(
				<Dropdown isPrimary={true} items={items}/>
			);

			expect(ReactDOM.findDOMNode(dropdown).className)
				.toBe('vui-dropdown vui-dropdown-primary');

		});

	});

	/*

	it ( 'menu select disabled', function() {
		var menuTestDOM = TestUtils.renderIntoDocument(
			<DropdownMenu.DropdownMenu items={menuItems}/>
		);
		var someLink = TestUtils.renderIntoDocument(
			<a href="http://www.brightspace.com">here</a>
		);

		TestUtils.Simulate.keyDown(
			ReactDOM.findDOMNode(menuTestDOM),
			{
				keyCode: keys.DOWN
			}
		);
		TestUtils.Simulate.keyDown(
			ReactDOM.findDOMNode(menuTestDOM),
			{
				keyCode: keys.DOWN
			}
		);
		TestUtils.Simulate.keyDown(
			ReactDOM.findDOMNode(menuTestDOM),
			{
				keyCode: keys.ENTER
			}
		);
		expect(clickCount).toBe(0);
	});
	*/

});
