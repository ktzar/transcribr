/** @jsx React.DOM */
define(['react', './player', './filepicker', './editor', './documents', './nav', './flashmessage'], function(React, Player, Filepicker, Editor, Documents, Nav, Flash) {
    return React.createClass({
        getInitialState: function () {
            return {
                file: false,
                filename: '',
                documentsOpened: false
            };
        },
        onDocumentsToggle: function () {
            this.setState({documentsOpened: !this.state.documentsOpened}); 
        },
        newFile: function(filedata, filename) {
            this.setState({
                filedata: filedata,
                filename: filename
            });
        },
        render: function () {
            return (
                <div className="transcribr">
                    <Nav onDocumentsToggle={this.onDocumentsToggle}/>
                    <div className='container-fluid'>
                        <div className='row'>
                            <Filepicker onNewfile={this.newFile} />
                        </div>
                        <div className='row'>
                            <div className='col-sm-4'>
                                <Player name={this.state.filename} data={this.state.filedata} />
                            </div>
                            <div className='col-sm-8'>
                                <Editor>This is the editor</Editor>
                            </div>
                        </div>
                    </div>
                    <Documents opened={this.state.documentsOpened}/>
                </div>
            );
        }
    });
});
