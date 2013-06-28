requirejs-handlebars
====================

This is an AMD loader for [Handlebars semantic templates](http://handlebars.com) which can be used as a drop-in replacement to [SlexAxton/require-handlebars-plugin](http://github.com/SlexAxton/require-handlebars-plugin/blob/master/hbs.js)


## Overview

- Uses an external HandlebarsJS engine (distributed by the Handlebars team).

- Uses the official ``text`` loader plugin maintained by the RequireJS team.

- You don't have to specify the template file extension (``.html is assumed``, but this is configurable).

Notes:

- The text library can be removed at build-time using ``r.js``.

- The extension ``.html`` is assumed, and this makes loading templates similar to loading JavaScript files with RequireJS (all extensions are assumned).

## Installation

Download HandlebarsJS and RequireJS-text:

- [HandlebarsJS](http://handlebars.com)

- [RequireJS-text](http://requirejs.org/docs/download.html#text)

Typically, you would place them in a ``scripts/libs`` folder then create a ``scripts/main.js`` file to alias them and to shim Handlebars:

```
require.config({
  paths: {
    Handlebars: 'libs/handlebars',
    text: 'libs/text'
    hbars: 'libs/hbars'
  },
  shim: {
    Handlebars: {
        exports: 'Handlebars'
    }
  }
});
```

## Usage

Specify the plugin using ``hbars!`` followed by the template file:

```
require(['backbone', 'hbars!template'], function (Backbone, template) {
  return Backbone.View.extend({
    initialize: function(){
      this.render();
    },
    render: function(){
      this.$el.html(template({message: 'hello'}));
  });
});
```

## Customization

You can specify the template file extension in your main.js:

```
require.config({

  // some paths and shims

  hbars: {
    extension: '.hbars' // default = '.html'
  }
});
```

## Optimization

This plugin is compatible with [r.js](http://requirejs.org/docs/optimization.html).

Optimization brings three benefits to a project:

- The templates are bundled within your code and not dynamically loaded which reduces the number of HTTP requests.

- The templates are partially pre-compiled before being bundled which reduces the work the client has to do.

The most important build options are:

- ``stubModules: ['text', 'hbars']``

The list of modules to stub out in the optimized file, i.e. the code is replaced with ``define('module',{});`` by ``r.js``

- ``removeCombined: true``

Removes from the output folder the files combined into a build.

## Example

Copy the ``example`` and ``example-build`` folders to your web server (``text`` is not compatible with the ``file://`` protocol and opening ``index.hml`` directly from your browser will not work).

Alternatively, you can use Connect and NodeJS to spin a web server:

- Install ``connect`` using ``npm`` and launch the server with NodeJS:

```
  $ npm install -g connect
  $ node server.js
```

Go to http://localhost:9000/example. Your browser should load:

- index.html

- require.js

- main.js

- hbars.js

- handlebars.js

- text.js

- message.html

Go to http://localhost:9000/example-build. Your browser should load:

- index.html

- require.js

- main.js







