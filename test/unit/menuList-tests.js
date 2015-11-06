'use strict';

jest.dontMock('../../dist/menuList');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const DropdownMenu = require( '../../index');

describe( 'menuList tests', function() {
	it('menuList has class name', function() {

		var items = [
			{
				text:'test'
			}
		];
		var menuListTestDOM = TestUtils.renderIntoDocument(
			<DropdownMenu.MenuList/>
		);

		expect(ReactDOM.findDOMNode(menuListTestDOM).className).toBe('dropdown-list-show');

	});
});
