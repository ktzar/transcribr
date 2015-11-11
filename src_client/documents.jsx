/** @jsx React.DOM */
define(['react', './document'], function(React, Document) {
    return React.createClass({
        _refreshData: function () {
            var data;
            try {
                data = JSON.parse(window.localStorage.getItem('transcribr-items'));
            } catch (e) {
                this._flashMessage("Can't load your stuff");
            }
            if (data) {
                this.setState({items: data.data});
            } else {
                window.localStorage.setItem('transcribr-items', '{"data":[]}');
            }
        },
        _flashMessage: function (message, type) {
            var that = this;
            this.setState({message: message});
            setTimeout(function () {
                that.setState({message: false});
            }, 1500);
        },
        getInitialState: function () {
            return {
                items: []
            };
        },
        componentWillMount: function () {
            setInterval(this._refreshData, 100);
        },
        render: function () {
            var containerClass = 'documents documents--' + (this.props.opened ? 'opened' : 'closed'),
                documents = this.state.items.map(function (item) {
                    return <Document name={item.name} />
                }),
                message = '';

            if (this.state.items.length === 0) {
                documents = <div className="alert alert-danger">No items yet. When you save your documents they'll appear here.</div>;
            }

            if (this.state.message) {
                message = <div className="label">{this.state.message}</div>;
            }

            return (
                <div ref="container" className={containerClass}>
                    <h3>Your documents</h3>
                    {message}
                    {documents}
                </div>
            );
        }
    });
});
