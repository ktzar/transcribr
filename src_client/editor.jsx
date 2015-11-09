/** @jsx React.DOM */
define(['react'], function(React) {
    return React.createClass({
        getInitialState: function () {
            return {
                started: false 
            };
        },
        _onFocus: function () {
            if (!this.state.started) {
                this.refs.editor.getDOMNode().innerHTML = '';
            }
            this.setState({started: true});
        },
        render: function () {
            var boxStyle = {
                height: '15em'
            };
            return (
                <div ref="editor" className="editor" style={boxStyle} onFocus={this._onFocus} contentEditable>Your text here...</div>
            );
        }
    });
});
