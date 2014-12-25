// RequireJS Handlebars template plugin
// http://github.com/jfparadis/requirejs-handlebars
//
// An alternative to http://github.com/SlexAxton/require-handlebars-plugin/blob/master/hbs.js
//
// Using Handlebars Semantic templates at http://handlebarsjs.com
// Using and RequireJS text.js at http://requirejs.org/docs/api.html#text
// @author JF Paradis
// @version 0.0.2
//
// Released under the MIT license
//
// Usage:
//   require(['backbone', 'hbar!mytemplate'], function (Backbone, mytemplate) {
//     return Backbone.View.extend({
//       initialize: function(){
//         this.render();
//       },
//       render: function(){
//         this.$el.html(mytemplate({message: 'hello'}));
//     });
//   });
//
// Configuration: (optional)
//   require.config({
//     hbars: {
//       extension: '.hbar' // default = '.html'
//     }
//   });

/*jslint nomen: true */
/*global define: false */

define(['text', 'handlebars'], function (text, Handlebars) {
    'use strict';

    var buildMap = {},
        buildTemplateSource = "define('{pluginName}!{moduleName}', ['Handlebars'], function (handlebars) { return Handlebars.template({content}); });\n";

    return {
        version: '0.0.2',

        load: function (moduleName, parentRequire, onload, config) {
            if (buildMap[moduleName]) {
                onload(buildMap[moduleName]);

            } else {
                var ext = (config.hbars && config.hbars.extension) || '.html',
                    path = (config.hbars && config.hbars.path) || '',
                    compileOptions = (config.hbars && config.hbars.compileOptions) || {},
                    textOnload = function (source) {
                        if (config.isBuild) {
                            // We store the precompiled template so we can use the
                            // handlebars.runtime after build.
                            buildMap[moduleName] = Handlebars.precompile(source, compileOptions);
                            // Don't bother doing anything else during build.
                            onload();
                        } else {
                            // We store the compiled template for reuse
                            buildMap[moduleName] = Handlebars.compile(source);
                            onload(buildMap[moduleName]);
                        }
                    };

                textOnload.error = onload.error;
                text.load(path + moduleName + ext, parentRequire, textOnload, config);
            }
        },

        write: function (pluginName, moduleName, write, config) {
            var content = buildMap[moduleName];
            if (content) {
                write.asModule(pluginName + '!' + moduleName,
                    buildTemplateSource
                    .replace('{pluginName}', pluginName)
                    .replace('{moduleName}', moduleName)
                    .replace('{content}', content));
            }
        }
    };
});
