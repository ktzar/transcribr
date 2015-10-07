/** @jsx React.DOM */
define(['react', './player', './filepicker', './editor'], function(React, Player, Filepicker, Editor) {
    return React.createClass({
        getInitialState: function () {
            return {
                file: 'song.mp3'
            };
        },
        newFile: function(filename) {
            this.setStatus({file: filename});
        },
        render: function () {
            return (
                <div className='transcribr'>
                    <Filepicker onNewfile={this.newFile} />
                    <Editor>This is the editor</Editor>
                    <Player file={this.state.file} />
                </div>
            );
        }
    });
});
