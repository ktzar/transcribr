/** @jsx React.DOM */
define(['react', './document', './flashmessage'], function(React, Document, Flashmessage) {
    var LS_KEY = 'transcribr-items';
    return React.createClass({
        _refreshData: function () {
            var data;
            try {
                data = JSON.parse(window.localStorage.getItem(LS_KEY));
            } catch (e) {
                this.setState({message: "Can't load your stuff"});
            }
            if (data.hasOwnProperty('items')) {
                this.setState({items: data.items});
            } else {
                window.localStorage.setItem(LS_KEY, '{"items":[]}');
            }
        },
        _openDocument: function (name) {
            console.log("Open document " + name);
        },
        _removeDocument: function (name) {
            console.log("Remove document " + name);
            var items = this.state.items;
            items.forEach(function (item, index) {
                if (item.name === name) {
                    items.splice(index, 1);
                }
            });
            this.setState({items: items});
            window.localStorage.setItem(LS_KEY, JSON.stringify({items: items}));
        },
        getInitialState: function () {
            return {
                items: [],
                message: ''
            };
        },
        componentWillMount: function () {
            setInterval(this._refreshData, 100);
        },
        render: function () {
            var that = this,
                containerClass = 'documents documents--' + (this.props.opened ? 'opened' : 'closed'),
                documents = this.state.items.map(function (item) {
                    return <Document name={item.name}
                        onOpen={that._openDocument}
                        onRemove={that._removeDocument} />
                });

            if (this.state.items.length === 0) {
                documents = <div className="alert alert-danger">No items yet. When you save your documents they'll appear here.</div>;
            }

            return (
                <div ref="container" className={containerClass}>
                    <h3>Your documents</h3>
                    <Flashmessage message={this.state.message} type="danger"/>
                    {documents}
                </div>
            );
        }
    });
});
