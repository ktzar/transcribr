requirejs.config({
    'paths': {
        'react': './react'           
    }
});

require(['react', './transcribr.js'], function (React, Transcribr) {
    React.renderComponent(
        Transcribr(), document.getElementById('app')
    );
});

