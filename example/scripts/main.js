require({
    paths: {
        templates: '../templates',
        Handlebars: 'libs/handlebars',
        text: 'libs/text',
        hbars: 'libs/hbars'
    },
    shim: {
        Handlebars: {
            exports: 'Handlebars'
        }
    }
}, ['hbars!templates/message'], function (template) {
    'use strict';

    console.log('template = ' + template);
    document.body.innerHTML += template({message: 'Hello World!'});
});
