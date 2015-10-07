/** @jsx React.DOM */
define(['react', './button'], function(React, Button) {
    return React.createClass({
        handleKey: function (e) {
            console.log(e.altKey , String.fromCharCode(e.keyCode));
            if (e.altKey) {
               switch (String.fromCharCode(e.keyCode)) {
                   case 'P':
                        if (this.refs.player.getDOMNode().paused) {
                            this.play();
                        } else {
                            this.pause();
                        }
                        break;
                   case 'S':
                        this.stop();
                        break;
                   case 'U':
                        this.minusFive();
                        break;
                   case 'I':
                        this.plusFive();
                        break;
               }
            }
        },
        componentDidMount: function () {
            document.onkeydown = this.handleKey;
        },
        getInitialState: function () {
            return {
                speed: 1.0
            };
        },
        //TODO on mount add onprogress to player to show time
        stop: function () {
            this.pause();
            this.refs.player.getDOMNode().currentTime = 0;
        },
        plusFive: function () {
            this.refs.player.getDOMNode().currentTime  += 5;
        },
        minusFive: function () {
            this.refs.player.getDOMNode().currentTime  -= 5;
        },
        pause: function () {
            this.refs.player.getDOMNode().pause();
        },
        play: function () {
            this.refs.player.getDOMNode().play();
        },
        slower: function () {
            var newSpeed = parseFloat(this.state.speed - 0.05).toFixed(2);
            this.setState({speed: newSpeed});
            this.adjustSpeed();
        },
        faster: function () {
            var newSpeed = parseFloat(this.state.speed + 0.05).toFixed(2);
            this.setState({speed: newSpeed});
            this.adjustSpeed();
        },
        adjustSpeed: function () {
            this.refs.player.getDOMNode().playbackRate = this.state.speed;
        },
        render: function () {
            return (
                <div className="player">
                    <audio ref="player" src={this.props.file} controls/>
                    <Button onClick={this.play} label="Play" icon="play" nolabel/>
                    <Button onClick={this.pause} label="Pause" icon="pause" nolabel/>
                    <Button onClick={this.stop} label="Stop" icon="stop" nolabel/>
                    <Button onClick={this.slower} label="Slower" icon="minus-sign"/>
                    <Button onClick={this.faster} label="Faster" icon="plus-sign"/>
                    <Button onClick={this.plusFive} label="+5s" icon="fast-forward"/>
                    <Button onClick={this.minusFive} label="-5s" icon="fast-backward"/>
                    <label>{this.state.speed}</label>
                </div>
            );
        }
    });
});
