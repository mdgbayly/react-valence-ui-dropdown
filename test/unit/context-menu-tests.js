'use strict';

jest.dontMock('../../src/context-menu');

var React = require('react'),
	ReactDOM = require('react-dom'),
	TestUtils = require('react-addons-test-utils'),
	ContextMenu = require('../../index').ContextMenu;

describe('context-menu', function() {

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

		var contextMenu = TestUtils.renderIntoDocument(
			<ContextMenu text="Stuff" items={items}/>
		);

		expect(ReactDOM.findDOMNode(contextMenu).className)
			.toBe('vui-dropdown-context-menu');

		expect(ReactDOM.findDOMNode(contextMenu).firstChild.className)
			.toBe('vui-context-menu');

	});

	it ('displays provided text in button', function() {

		var contextMenu = TestUtils.renderIntoDocument(
			<ContextMenu text="Stuff" />
		);

		expect(ReactDOM.findDOMNode(contextMenu).firstChild.firstChild.textContent)
			.toBe("Stuff");

	});

});
