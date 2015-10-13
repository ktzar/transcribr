/** @jsx React.DOM */
define(['react'], function(React) {
    return React.createClass({
        render: function () {
            var boxStyle = {
                height: '15em'
            };
            return (
                <div className="editor" style={boxStyle} contentEditable>Your text here...</div>
            );
        }
    });
});
