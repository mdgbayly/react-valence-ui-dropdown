'use strict';

jest.dontMock('../../src/context-menu');
jest.dontMock('../../src/menu');
jest.dontMock('../../src/item');

var React = require('react'),
	ReactDOM = require('react-dom'),
	TestUtils = require('react-addons-test-utils'),
	keys = require('../../src/keys'),
	ContextMenu = require('../../index').ContextMenu;

describe('context-menu', function() {

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

		var contextMenu = TestUtils.renderIntoDocument(
			<ContextMenu text="Stuff" items={items}/>
		);

		expect(ReactDOM.findDOMNode(contextMenu).className)
			.toBe('vui-dropdown');

		expect(ReactDOM.findDOMNode(contextMenu).firstChild.className)
			.toBe('vui-context-menu');

	});

	it('has aria haspopup attribute', function() {

		var contextMenu = TestUtils.renderIntoDocument(
			<ContextMenu text="Stuff" />
		);

		expect(ReactDOM.findDOMNode(contextMenu).firstChild.getAttribute('aria-haspopup'))
			.toBe('true');

	});

	it ('displays provided text in button', function() {

		var contextMenu = TestUtils.renderIntoDocument(
			<ContextMenu text="Stuff" />
		);

		expect(ReactDOM.findDOMNode(contextMenu).firstChild.firstChild.firstChild.textContent)
			.toBe("Stuff");

	});

});
