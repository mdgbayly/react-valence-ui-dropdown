'use strict';

jest.dontMock('../../dist/dropdownMenu');
jest.dontMock('../../dist/menuList');
jest.dontMock('../../dist/menuItem');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import keys from '../../src/keys.js';

const DropdownMenu = require( '../../index');



describe( 'menu tests', function() {

	const menuItems = [
		{
			text: 'First menu item',
			onClick: onClickTest
		},
		{
			text: 'Second menu item',
			isDisabled: true,
			onClick: onClickTest
		}
	];

	var clickCount = 0;

	function onClickTest() {
		clickCount += 1;
	}

	beforeEach( function() {
		clickCount = 0;
	});

	it( 'menu has class name', function() {

		var menuTestDOM = TestUtils.renderIntoDocument(
			<DropdownMenu.DropdownMenu items={menuItems}/>
		);

		expect(ReactDOM.findDOMNode(menuTestDOM).className).toBe('dropdown-arrow-icon');

	});

	it( 'menu list is not visible', function() {
		var menuTestDOM = TestUtils.renderIntoDocument(
			<DropdownMenu.DropdownMenu/>
		);
		expect(menuTestDOM.state.isListVisible).toBe(false);
	});

	it( 'menu list is visible', function() {
		var menuTestDOM = TestUtils.renderIntoDocument(
			<DropdownMenu.DropdownMenu/>
		);

		TestUtils.Simulate.click(
			ReactDOM.findDOMNode(menuTestDOM)
		);
		expect(menuTestDOM.state.isListVisible).toBe(true);
	});

	it( 'menu opened with enter', function() {
		var menuTestDOM = TestUtils.renderIntoDocument(
			<DropdownMenu.DropdownMenu/>
		);
		TestUtils.Simulate.keyDown(
			ReactDOM.findDOMNode(menuTestDOM),
			{
				keyCode: keys.ENTER
			}
		);
		expect(menuTestDOM.state.isListVisible).toBe(true);
		expect(menuTestDOM.state.selectedItem).toBe(-1);
	});

	it ( 'menu opened with down arrow', function() {
		var menuTestDOM = TestUtils.renderIntoDocument(
			<DropdownMenu.DropdownMenu/>
		);
		TestUtils.Simulate.keyDown(
			ReactDOM.findDOMNode(menuTestDOM),
			{
				keyCode: keys.DOWN
			}
		);
		expect(menuTestDOM.state.isListVisible).toBe(true);
		expect(menuTestDOM.state.selectedItem).toBe(0);
	});

	it ( 'menu closed with escape', function() {
		var menuTestDOM = TestUtils.renderIntoDocument(
			<DropdownMenu.DropdownMenu/>
		);
		TestUtils.Simulate.keyDown(
			ReactDOM.findDOMNode(menuTestDOM),
			{
				keyCode: keys.DOWN
			}
		);
		expect(menuTestDOM.state.isListVisible).toBe(true);
		TestUtils.Simulate.keyDown(
			ReactDOM.findDOMNode(menuTestDOM),
			{
				keyCode: keys.ESCAPE
			}
		);
		expect(menuTestDOM.state.isListVisible).toBe(false);
	});

	it ( 'set focus directly', function() {
		var menuTestDOM = TestUtils.renderIntoDocument(
			<DropdownMenu.DropdownMenu/>
		);
		menuTestDOM.selectFocus(1);
		expect(menuTestDOM.state.selectedItem).toBe(1);
	});

	it ( 'select menu item', function() {
		var menuTestDOM = TestUtils.renderIntoDocument(
			<DropdownMenu.DropdownMenu items={menuItems}/>
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
		expect(clickCount).toBe(1);
	});

	it ( 'menu rollover down', function() {
		var menuTestDOM = TestUtils.renderIntoDocument(
			<DropdownMenu.DropdownMenu items={menuItems}/>
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
				keyCode: keys.DOWN
			}
		);
		expect(menuTestDOM.state.selectedItem).toBe(0);
	});

	it ( 'menu rollover up', function() {
		var menuTestDOM = TestUtils.renderIntoDocument(
			<DropdownMenu.DropdownMenu items={menuItems}/>
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
				keyCode: keys.UP
			}
		);
		expect(menuTestDOM.state.selectedItem).toBe(1);
	});

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
});
