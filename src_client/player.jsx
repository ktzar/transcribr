/** @jsx React.DOM */
define(['react', './button'], function(React, Button) {
    return React.createClass({
        getInitialState: function () {
            return {
                speed: 1.0,
                currentTime: 1,
                totalTime: ''
            };
        },
        handleKey: function (e) {
            if (e.keyCode === 9) {
                e.preventDefault();
                e.cancelBubble = true;
                if (e.shiftKey) {
                    this.minusFive();
                } else {
                    if (this.refs.player.getDOMNode().paused) {
                        this.play();
                    } else {
                        this.pause();
                    }
                }
            }
        },
        secondsToTime: function (seconds) {
            var negative = false, result = '';
            if (seconds < 0) {
                seconds *= -1;
                negative = true;
            }
            if (seconds < 10) {
                result = "00:0"+seconds;
            } else if (seconds < 60) {
                result = "00:"+seconds;
            } else {
                var remainingSeconds = seconds % 60,
                    minutes = (seconds - remainingSeconds) / 60;
                if (remainingSeconds < 10) {
                    remainingSeconds = "0" + remainingSeconds;
                }
                result = minutes+":"+remainingSeconds;
            }
            return (negative?'-':'') + result;
        },
        componentDidMount: function () {
            document.onkeydown = this.handleKey;
            this.refs.player.getDOMNode().ontimeupdate = this.updateProgress;
        },
        updateProgress: function () {
            var player = this.refs.player.getDOMNode();
            this.setState({
                currentTime: Math.round(player.currentTime),
                totalTime: Math.ceil(player.duration)
            });
        },
        stop: function () {
            this.pause();
            this.refs.player.getDOMNode().currentTime = 0;
        },
        plusFive: function () {
            this.refs.player.getDOMNode().currentTime  += 5;
            this.updateProgress();
        },
        minusFive: function () {
            this.refs.player.getDOMNode().currentTime  -= 5;
            this.updateProgress();
        },
        pause: function () {
            this.refs.player.getDOMNode().pause();
        },
        play: function () {
            this.refs.player.getDOMNode().play();
        },
        isPlaying: function () {
            if (this.refs.player) {
                return ! this.refs.player.getDOMNode().paused;
            } else {
                return false;
            }
        },
        slower: function () {
            var newSpeed = (parseFloat(this.state.speed) - 0.05).toFixed(2);
            this.setState({speed: newSpeed});
            this.adjustSpeed();
        },
        faster: function () {
            var newSpeed = (parseFloat(this.state.speed) + 0.05).toFixed(2);
            this.setState({speed: newSpeed});
            this.adjustSpeed();
        },
        adjustSpeed: function () {
            this.refs.player.getDOMNode().playbackRate = this.state.speed;
        },
        render: function () {
            var currentTime = this.secondsToTime(this.state.currentTime),
                totalTime = this.secondsToTime(this.state.totalTime),
                timeLabel = "player__elapsed label label-" + (this.isPlaying() ? 'success' : 'warning'),
                playing = <div className="label label-warning">No audio file loaded</div>;

            if (this.props.data) {
                var songName = this.props.name.match(/(.*)\.[a-zA-Z0-9]{3}$/)[1];
                playing = <div className="label label-primary">Playing {songName}</div>
            }

            return (
                <div className="player">
                    {playing}
                    <audio ref="player" src={this.props.data}/>
                    <br/>
                    <div className="btn-group">
                        <Button disabled={!this.props.data || this.isPlaying()} onClick={this.play} label="Play" icon="play" type="success" nolabel/>
                        <Button disabled={!this.isPlaying()} onClick={this.pause} label="Pause" icon="pause" type="warning" nolabel/>
                        <Button disabled={!this.isPlaying()} onClick={this.stop} label="Stop" icon="stop" type="danger" nolabel/>
                    </div>
                    <br/>
                    <div className="btn-group">
                        <Button type="xs" onClick={this.slower} label="Slower" icon="minus-sign"/>
                        <Button type="xs" onClick={this.faster} label="Faster" icon="plus-sign"/>
                        <Button type="xs" onClick={this.minusFive} label="-5s" icon="fast-backward"/>
                        <Button type="xs" onClick={this.plusFive} label="+5s" icon="fast-forward"/>
                    </div>
                    <br/>
                    <label className="player__speed badge badge-primary">{this.state.speed}x</label>
                    <label className={timeLabel}>
                        {currentTime} / {totalTime}
                    </label>
                    <h4>Shortcuts</h4>
                    <ul>
                        <li>Tab: play / pause</li>
                        <li>Shift + Tab: go back 5 seconds</li>
                    </ul>
                </div>
            );
        }
    });
});
