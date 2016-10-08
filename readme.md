# HotKeyJS

With HotKeyJS, you can add hotkey shotcut and callback function to your web page in an easy way.

## Download

```
cd 'javascript path to resources folder of your project'

git clone git@github.com:haaaiiimmm/hotkeyjs.git

```

Just add hotkeyjs script to your html.

## Quick start

HotKey is a constructor which had binded to window(in browser) as a global Object.

The example blow shows how to say hello when people press 'a' on your web page.

```
new HotKey('a', function(){
	alert('Hello World!');
})
```

If you want to capture 'ctrl+z' combination or 'ctrl+shift+z' combination and do something:

```
new HotKey('ctrl+z', function(){
	// do whatever you want
})

new HotKey('ctrl+shift+z', function(){
	// do whatever you want
})
```
Even you want to capture 'cmd+r' combination, which in MacOS Chrome will cause refresh, you can use HotKey either:

```
new HotKey('cmd+r', {preventDefault: true}, function(){
	// do whatever you want
})

```


