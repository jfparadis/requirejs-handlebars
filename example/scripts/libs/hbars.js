// RequireJS Handlebars template plugin
// http://github.com/jfparadis/requirejs-handlebars
//
// An alternative to http://github.com/SlexAxton/require-handlebars-plugin/blob/master/hbs.js
//
// Using Handlebars Semantic templates at http://handlebarsjs.com
// Using and RequireJS text.js at http://requirejs.org/docs/api.html#text
// @author JF Paradis
// @version 0.0.1
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

define(['text', 'Handlebars'], function (text, Handlebars) {
    'use strict';

    var buildMap = {},
        buildTemplateSource = "define('{pluginName}!{moduleName}', ['Handlebars'], function (Handlebars) { return Handlebars.template({content}); });\n";

    return {
        version: '0.0.1',

        load: function (moduleName, parentRequire, onload, config) {
            var ext = (config.hbars && config.hbars.extension) || '.html';
            var compileOpts = (config.hbars && config.hbars.compileOptions) || {};
            text.load(moduleName + ext, parentRequire, function (source) {
                if (config.isBuild) {
                    // we store the precompiled template so we can use the
                    // handlebars.runtime after build
                    buildMap[moduleName] = Handlebars.precompile(source, compileOpts);
                }
                onload( Handlebars.compile(source, compileOpts) );
            }, config);
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
