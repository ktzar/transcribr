/** @jsx React.DOM */
define(['react'], function(React) {
    return React.createClass({
        _cancelEvent: function (e) {
            if (e.preventDefault) { e.preventDefault(); }
            return false;
        },
        getInitialState: function () {
            return {
                status: ''
            };
        },
        _handleFileDrop: function (e) {
            var dt, files, reader;

            e = e || window.event; // get window.event if e argument missing (in IE)   
            if (e.preventDefault) { e.preventDefault(); }

            dt = e.dataTransfer;
            files = dt.files;
            this._readFile(files[0]);
            return false;
        },
        _handleFileSelect: function (evt) {
           var files = evt.target.files;
           this._readFile(files[0]);
        },
        _readFile: function (file) {
            var that = this;
            reader = new FileReader();
            reader.onprogress = function (progress) {
                var percentage = 100 * parseInt(progress.loaded / progress.total);
                that.setState({
                    status: 'Processing: ' + percentage + "%"
                });
            };
            reader.onload = function () {
                that.props.onNewfile(reader.result, file.name);
                that.setState({
                    status: file.name + ' loaded!'
                });
                $('#loadModal').modal('hide');
            };
            reader.readAsDataURL(file);
        },
        componentDidMount: function () {
            if(window.FileReader) { 
                var status = this.refs.status.getDOMNode(),
                    filedrop = this.refs.drop.getDOMNode(),
                    fileinput = this.refs.fileinput.getDOMNode(),
                    that = this;

                fileinput.addEventListener('change', this._handleFileSelect, false);
                filedrop.addEventListener('drop', this._handleFileDrop);
                filedrop.addEventListener('dragover', this._cancelEvent);
                filedrop.addEventListener('dragenter', this._cancelEvent);
            } else { 
                this.refs.status.innerHTML = 'Your browser does not support the HTML5 FileReader.';
            }
        },
        render: function () {
            return (
                <div className="modal fade" id="loadModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="myModalLabel">Open a file</h4>
                            </div>
                            <div className="modal-body filepicker">
                                <input type="file" ref="fileinput" name="files" />
                                <div className="drop" ref="drop">Drag a file here</div>
                                <div className="status" ref="status">{this.state.status}</div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });
});
