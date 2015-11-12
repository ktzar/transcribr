/** @jsx React.DOM */
define(['react', './button'], function(React, Button) {
    return React.createClass({
        _onOpen: function () {
            this.props.onOpen(this.props.name);
        },
        _onRemove: function () {
            this.props.onRemove(this.props.name);
        },
        render: function () {
            return (
                <div className="document">
                    <span>{this.props.name}</span>&nbsp;
                    <div className="btn-group pull-right">
                        <Button onClick={this._onOpen} type="xs" icon="folder-open"/>
                        <Button onClick={this._onRemove} type="xs" icon="trash"/>
                    </div>
                </div>
            );
        }
    });
});
