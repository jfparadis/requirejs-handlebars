requirejs-handlebars
====================

This is an AMD loader for [Handlebars semantic templates](http://handlebarsjs.com/) which can be used as a drop-in replacement to [SlexAxton/require-handlebars-plugin](http://github.com/SlexAxton/require-handlebars-plugin/blob/master/hbs.js)


## Overview

- Uses an external HandlebarsJS engine (distributed by the Handlebars team).
- Uses the official ``text`` loader plugin maintained by the RequireJS team.
- You don't have to specify the template file extension (``.html is assumed``, but this is configurable).

Notes:

- The ``text`` and ``hbar`` plugins can be removed at build-time using ``r.js`` (with the ``stubModules`` setting).
- The extension ``.html`` is assumed, and this makes loading templates similar to loading JavaScript files with RequireJS (all extensions are assumed).

## Changelog

0.0.1 Initial version

0.0.2 Various updates:
- Add template path option to hbar.js (thanks drewrichards)
- Updated require.js to 2.1.8 , and r.js to 2.1.8
- Updated handlebar.js to 1.0.0

## Installation

Download HandlebarsJS and RequireJS-text:

- [HandlebarsJS](http://handlebarsjs.com/)
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
    extension: '.hbs', // default = '.html'
    compileOptions: {}  // options object which is passed to Handlebars compiler
  }
});
```

## Optimization

This plugin is compatible with [r.js](http://requirejs.org/docs/optimization.html).

Optimization brings three benefits to a project:

- The templates are bundled within your code and not dynamically loaded which reduces the number of HTTP requests.

- The templates are pre-compiled before being bundled which reduces the work the client has to do.

- Since templates are pre-compiled during build you can use the handlebars.runtime which is ~1KB after minification+gzip.

If you don't use any extra tool to manage your libraries, need to manually replace the handlebars.runtime during compilation by adding this routine to your main.js. See the example for how it works:

```
    onBuildWrite : function(moduleName, path, content){

        // replace handlebars with the runtime version
        if (moduleName === 'Handlebars') {
            path = path.replace('handlebars.js','handlebars.runtime.js');
            content = fs.readFileSync(path).toString();
            content = content.replace(/(define\()(function)/, '$1"handlebars", $2');
        }
        return content;
    }
```

The most important build options are:

```stubModules: ['text', 'hbars']```

The list of modules to stub out in the optimized file, i.e. the code is replaced with ``define('module',{});`` by ``r.js``

```removeCombined: true```

Removes from the output folder the files combined into a build.

## Example

Sample build options are in the root ``build.js``. Compile the example using:

```
  $ ./build.sh
```

Copy the ``example`` and ``example-build`` folders to your web server (``text`` is not compatible with the ``file://`` protocol and opening ``index.hml`` directly from your browser will not work).

### Using a test server

Alternatively, you can use Connect and NodeJS to spin a web server:

- Install ``connect`` using ``npm`` and launch the server with NodeJS:

```
  $ npm install -g connect
  $ npm link connect
  $ node server.js
```

Go to [http://localhost:9000/example](http://localhost:9000/example). Your browser should load:

- index.html
- require.js
- main.js
- hbars.js
- handlebars.js
- text.js
- message.html

Go to [http://localhost:9000/example-build](http://localhost:9000/example-build). Your browser should load:

- index.html
- require.js
- main.js







