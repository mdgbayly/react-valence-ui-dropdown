'use strict';

jest.dontMock('../../dist/menuItem');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const DropdownMenu = require( '../../index');

describe('menuItem', function() {
	it( 'contains menu test', function() {
		var menuItemTest = TestUtils.renderIntoDocument(
			<DropdownMenu.MenuItem text="menu test"/>
		);
		var menuItemTestNode = ReactDOM.findDOMNode(menuItemTest);
		expect(menuItemTestNode.textContent).toEqual( 'menu test' );
	});

	it( 'menu item is clickable', function() {
		var onClickCallback = jest.genMockFunction();
		var menuItemTest = <DropdownMenu.MenuItem onClick={onClickCallback}/>;
		var menuItemTestDOM = TestUtils.renderIntoDocument(
			menuItemTest
		);
		// simulate a click
		TestUtils.Simulate.click(
			ReactDOM.findDOMNode(menuItemTestDOM)
		);
		expect(onClickCallback.mock.calls.length).toEqual(1);
	});

	it( 'menu item is disabled', function() {
		var onClickCallback = jest.genMockFunction();
		var menuItemTest = <DropdownMenu.MenuItem onClick={onClickCallback} disabled={true}/>;
		var menuItemTestDOM = TestUtils.renderIntoDocument(
			menuItemTest
		);
		// simulate a click
		TestUtils.Simulate.click(
			ReactDOM.findDOMNode(menuItemTestDOM)
		);


		expect(onClickCallback.mock.calls.length).toEqual(0);
	});

	it('menuItem has class name', function() {

		var menuItemTestDOM = TestUtils.renderIntoDocument(
			<DropdownMenu.MenuItem text="menu test"/>
		);

		expect(ReactDOM.findDOMNode(menuItemTestDOM).className).toBe('dropdown-item');

	});
});
