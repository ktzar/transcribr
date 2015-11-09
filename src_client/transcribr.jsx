/** @jsx React.DOM */
define(['react', './player', './filepicker', './editor', './nav'], function(React, Player, Filepicker, Editor, Nav) {
    return React.createClass({
        getInitialState: function () {
            return {
                file: false,
                filename: ''
            };
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
                    <Nav />
                    <div className='container-fluid'>
                        <div className='row'>
                            <Filepicker onNewfile={this.newFile} />
                        </div>
                        <div className='row'>
                            <div className='col-md-4'>
                                <Player name={this.state.filename} data={this.state.filedata} />
                            </div>
                            <div className='col-md-8'>
                                <Editor>This is the editor</Editor>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });
});
