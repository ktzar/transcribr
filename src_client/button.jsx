/** @jsx React.DOM */
define(['react'], function(React) {
    return React.createClass({
        render: function () {
            var className = "btn",
                shortcut = "", icon = "", label = "", title="";
            if (this.props.type) {
                className += " btn-" + this.props.type;
            }
            if (this.props.shortcut) {
                shortcut = "Ctrl + " + this.props.shortcut.slice(0,1);
                title = shortcut;
            }
            if (this.props.icon) {
                icon = <span className={"glyphicon glyphicon-" + this.props.icon} aria-hidden="true"></span>
            }
            if (this.props.nolabel) {
                title = this.props.label;
            } else {
                label = this.props.label;
            }
            return (
                <button disabled={this.props.disabled} className={className}title={title} onClick={this.props.onClick}>{icon}
                    {label}
                </button>
            );
        }
    });
});
