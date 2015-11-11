/** @jsx React.DOM */
define(['react'], function(React) {
    return React.createClass({
        _onDocumentsToggle: function () {
            if (typeof this.props.onDocumentsToggle === 'function') {
                this.props.onDocumentsToggle();
            }
        },
        render: function () {
            return (
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                          <a className="navbar-brand" href="#">Transcribr</a>
                        </div>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#" data-toggle="modal" data-target="#loadModal"><em className="glyphicon glyphicon-music"></em> Load audio</a></li>
                            <li><a href="#" onClick={this._onDocumentsToggle}><em className="glyphicon glyphicon-floppy-disk"></em> Documents</a></li>
                        </ul>
                    </div>
                </nav>
            );
        }
    });
});
