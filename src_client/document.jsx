/** @jsx React.DOM */
define(['react', './button'], function(React, Button) {
    return React.createClass({
        render: function () {
            return (
                <div className="document">
                    <span>{this.props.name}</span>
                    <Button type="xs" icon="floppy-disk"/>
                    <Button type="xs" icon="trash"/>
                </div>
            );
        }
    });
});
