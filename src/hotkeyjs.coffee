'use strict'

class HotKey
	constructor: (@key, params, @cb)->
		###
			throw err if the first argument is not a string val
		###
		if typeof @key != 'string'
			throw Error 'The first params mush be a string.'
		
		###
			set callback if there is no second val
		###
		if typeof params is 'function'
			@cb = params
		else
			for index, val of params
				@[index] = val

		### 
			Store special keys like cmd, shift etc...
			and mark them as bool val.
			Do callback only if these are pressed.
		###
		@tmp = {}

		body = document.body

		###
			remove space, tab etc..
		###
		@key = @key.replace /\s/gi, ''

		if not @isSingleKey @key
			@isMulti = yes
			@getSpecialKey @key
		
		body.addEventListener 'keydown', @keydown.bind this

	### return true if the first argument do not contain '+' ###
	isSingleKey: (key)->
		return not /\+/gi.test key

	### key down ###
	keydown: ($event)->
		$event = $event || window.event # for IE

		###
			prevent default if has to
		###
		$event.preventDefault() if @preventDefault

		if @isMulti
			for i of @tmp
				if not $event[i]
					return

		key = ($event.key || (String.fromCharCode $event.keyCode)).toLowerCase()

		if key is @key
			@cb()

	getSpecialKey: (key)->
		keyarray = key.split '+'

		for i in keyarray
			i = i.toLowerCase()
			if i is 'meta' or i is 'command' or i is 'cmd'
				@tmp['metaKey'] = yes
			else if i is 'control' or i is 'ctrl'
				@tmp['ctrlKey'] = yes
			else if i is 'shift'
				@tmp['shiftKey'] = yes
			else if i is 'alt' or i is 'option'
				@tmp['altKey'] = yes

		@key = @key.split(/ctrl|control|shift|meta|command|alt|option|cmd|\+/gi)?.join('').toLowerCase()


window?.HotKey = HotKey
