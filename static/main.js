requirejs.config({
    'paths': {
        'react': './libs/react'           
    }
});

require(['react', './js/transcribr.js'], function (React, Transcribr) {
    React.renderComponent(
        Transcribr(), document.getElementById('app')
    );
});

