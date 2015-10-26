/** @jsx React.DOM */
define(['react'], function(React) {
    return React.createClass({
        _cancel: function (e) {
            if (e.preventDefault) { e.preventDefault(); }
            return false;
        },
        componentDidMount: function () {
            if(window.FileReader) { 
                var status = this.refs.status.getDOMNode(),
                    drop = this.refs.drop.getDOMNode(),
                    that = this;

                drop.addEventListener('dragover', this._cancel);
                drop.addEventListener('dragenter', this._cancel);
                drop.addEventListener('drop', function (e) {
                    e = e || window.event; // get window.event if e argument missing (in IE)   
                    if (e.preventDefault) { e.preventDefault(); }

                    var dt = e.dataTransfer;
                    var files = dt.files;
                        console.log(files);
                    //that.props.onNewfile(files[0].name);

                    var reader = new FileReader();
                    reader.onload = function () {
                        that.props.onNewfile(e.target.result);
                    };
                    //attach event handlers here...
                    var blob = reader.readAsDataURL(files[0]);

                    /*
                    for (var i=0; i<files.length; i++) {
                        var file = files[i];
                        var reader = new FileReader();

                        //attach event handlers here...

                        reader.readAsDataURL(file);
                    }
                    */
                    return false;
                });
            } else { 
                this.refs.status.innerHTML = 'Your browser does not support the HTML5 FileReader.';
            }
        },
        render: function () {
            return (
                <div className="filepicker">
                    <h4>filepicker</h4>
                    <div className="drop" ref="drop"></div>
                    <div className="status" ref="status"></div>
                </div>
            );
        }
    });
});
