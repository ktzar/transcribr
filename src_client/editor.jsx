/** @jsx React.DOM */
define(['react', './button'], function(React, Button) {
    return React.createClass({
        getInitialState: function () {
            return {};
        },
        render: function () {
            return (
                <div className="editor">
                    <input ref="title" className="editor__title" placeholder="Title"></input>
                    <textarea ref="text" className="editor__text" placeholder="Your text here"></textarea>
                    <Button type="success" icon="save" label="Save"/>
                </div>
            );
        }
    });
});
