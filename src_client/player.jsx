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
        //TODO on mount add onprogress to player to show time
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
            var currentTime = this.secondsToTime(this.state.currentTime),
                totalTime = this.secondsToTime(this.state.totalTime),
                timeLabel = "player__elapsed label label-" + (this.isPlaying() ? 'success' : 'warning');
            return (
                <div className="player">
                    <audio ref="player" src={this.props.file}/>
                    <Button disabled={this.isPlaying()} onClick={this.play} label="Play" icon="play" type="success" nolabel/>
                    <Button disabled={!this.isPlaying()} onClick={this.pause} label="Pause" icon="pause" type="warning" nolabel/>
                    <Button disabled={!this.isPlaying()} onClick={this.stop} label="Stop" icon="stop" type="danger" nolabel/>
                    <Button onClick={this.slower} label="Slower" icon="minus-sign"/>
                    <Button onClick={this.faster} label="Faster" icon="plus-sign"/>
                    <Button onClick={this.minusFive} label="-5s" icon="fast-backward"/>
                    <Button onClick={this.plusFive} label="+5s" icon="fast-forward"/>
                    <label className="player__speed badge badge-primary">{this.state.speed}x</label>
                    <label className={timeLabel}>
                        {currentTime} / {totalTime}
                    </label>
                </div>
            );
        }
    });
});
