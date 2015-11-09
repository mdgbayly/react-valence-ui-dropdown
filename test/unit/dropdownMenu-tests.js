'use strict';

jest.dontMock('../../dist/dropdownMenu');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const DropdownMenu = require( '../../index');

describe( 'menu tests', function() {
	it( 'menu has class name', function() {

		var menuTestDOM = TestUtils.renderIntoDocument(
			<DropdownMenu.DropdownMenu/>
		);

		expect(ReactDOM.findDOMNode(menuTestDOM).className).toBe('dropdown-arrow-icon');

	});

	it( 'menu list is not visible', function() {
		var menuTestDOM = TestUtils.renderIntoDocument(
			<DropdownMenu.DropdownMenu/>
		);
		expect(menuTestDOM.state.listVisible).toBe(false);
	});

	it( 'menu list is visible', function() {
		var menuTestDOM = TestUtils.renderIntoDocument(
			<DropdownMenu.DropdownMenu/>
		);

		TestUtils.Simulate.click(
			ReactDOM.findDOMNode(menuTestDOM)
		);
		expect(menuTestDOM.state.listVisible).toBe(true);
	});
});
