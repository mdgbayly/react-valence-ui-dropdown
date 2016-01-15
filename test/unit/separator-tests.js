'use strict';

jest.dontMock('../../src/separator');

var React = require('react'),
	ReactDOM = require('react-dom'),
	TestUtils = require('react-addons-test-utils'),
	Separator = require('../../src/separator');

describe('separator', function() {

	it('has the menuitem aria role', function() {

		var separator = TestUtils.renderIntoDocument(
			<Separator />
		);

		expect(ReactDOM.findDOMNode(separator).getAttribute('role'))
			.toBe('separator');

	});

});
