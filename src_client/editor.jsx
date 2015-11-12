/** @jsx React.DOM */
define(['react', './flashmessage', './button'], function(React, Flashmessage, Button) {
    return React.createClass({
        _onSave: function () {
            var name = this.refs.title.getDOMNode().value,
                text = this.refs.text.getDOMNode().value,
                updated = false,
                message = '',
                items;
            try {
                items = JSON.parse(window.localStorage.getItem('transcribr-items')).items,
                items.forEach(function (item, index) {
                    if (item.name === name) {
                        items[index].text = text;
                        updated = true;
                    }
                });
                if (!updated) {
                    items.push({name: name, text: text});
                }
                window.localStorage.setItem('transcribr-items', JSON.stringify({items: items}));
                if (updated) {
                    message = "Your document has been updated";
                } else {
                    message = "A new document was created";
                }
                this.setState({message: message});
            } catch (e) {
                console.error('There was an error while saving your document', e);
            };
        },
        getInitialState: function () {
            return {message: ''};
        },
        render: function () {
            return (
                <div className="editor">
                    <input ref="title" className="editor__title" placeholder="Title"></input>
                    <textarea ref="text" className="editor__text" placeholder="Your text here"></textarea>
                    <Button onClick={this._onSave} type="success" icon="save" label="Save"/>
                    <Flashmessage message={this.state.message} type="success"/>
                </div>
            );
        }
    });
});
