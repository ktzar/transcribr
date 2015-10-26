/** @jsx React.DOM */
define(['react', './player', './filepicker', './editor'], function(React, Player, Filepicker, Editor) {
    return React.createClass({
        getInitialState: function () {
            return {
                file: 'song.mp3'
            };
        },
        newFile: function(filename) {
            console.log(filename);
            this.setState({file: filename});
        },
        render: function () {
            return (
                <div className='transcribr container-fluid'>
                    <div className='row'>
                        <Filepicker onNewfile={this.newFile} />
                    </div>
                    <div className='row'>
                        <div className='col-md-4'>
                            <Player file={this.state.file} />
                        </div>
                        <div className='col-md-8'>
                            <Editor>This is the editor</Editor>
                        </div>
                    </div>
                </div>
            );
        }
    });
});
