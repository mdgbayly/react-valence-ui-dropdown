# react-vui-dropdown 

A react component for a dropdown, or context, menu. It is intended for use in applications used in the Brightspace LMS.
<br />
[![travis badge](https://travis-ci.org/Brightspace/react-vui-dropdown.svg?branch=master)](https://travis-ci.org/Brightspace/react-vui-dropdown)

## Installation
NPM Install
```bash
npm install react-vui-dropdown
```

Bower Installation
```bash
bower install react-vui-dropdown
```

## Usage
To use a dropdown menu component be sure to import its style
```js
@import '<ROOT>/node_modules/react-vui-dropdown/dropdownMenu'
or
@import '<ROOT>/bower_components/react-vui-dropdown/dropdownMenu';
```

The menu takes a list of objects to represent the menu items, each of the menu item objects has properties for:
<ul>
	<li>text - this display text</li>
	<li>onClick - a function to be called when the item is clicked</li>
	<li>disabled - (boolean) if true the menu item will be shown in a disabled state and will not be clickable.</li>
</ul>

#### Full Menu Control
```js
var DropdownMenu = require('react-vui-dropdwon');

var menuItems = [
	{
		text: 'First Menu text'
		disabled: false,
		onClick: myClickFunc
	},
	{
		text: 'Second Menu text'
		disabled: true,
		onClick: myClickFunc2
	}
]

<DropdownMenu.DropdownMenu items={menuItems}/>
```
#### List Only
Provide your own control to display the menu if needed
```js
var DropdownMenu = require('react-vui-dropdown');

var menuItems = [
	{
		text: 'First Menu text'
		disabled: false,
		onClick: myClickFunc
	},
	{
		text: 'Second Menu text'
		disabled: true,
		onClick: myClickFunc2
	}
]

<DropdownMenu.MenuList items={menuItems}/>
```
