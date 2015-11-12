/** @jsx React.DOM */
define(['react'], function(React) {
    var timeoutRef;
    return React.createClass({
        _flashMessage: function (message) {
            var that = this,
                timeout = this.props.timeout || 3500;

            this.setState({message: message});
            
            timeoutRef && clearTimeout(timeoutRef);

            timeoutRef = setTimeout(function () {
                that.setState({message: ''});
            }, timeout);
        },
        getInitialState: function () {
            return {message: ''};
        },
        componentWillReceiveProps: function (nextProps) {
            this._flashMessage(nextProps.message);
        },
        componentDidMount: function () {
            this._flashMessage(this.props.message);
        },
        render: function () {
            var type = this.props.type || 'primary',
                className = 'alert alert-' + type,
                message = this.state.message;

            if (message === '') { return <div/>; }

            return <div className={className}>{this.state.message}</div>
        }
    });
});
