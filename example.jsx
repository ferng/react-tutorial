var React = require('react');
var ReactDOM = require('react-dom');

var Comment = React.createClass({
    render: function () {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.activity}
                </h2>
                {this.props.children.toString()}
            </div>
        );
    }
});

var CommentBox = React.createClass({
    loadCommentsFromServer: function () {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', "http://localhost:8080/api/comments?_=1476854515917");
        var msg;
        xhr.onload = function () {
            if (xhr.status === 200) {
                msg = JSON.parse(xhr.responseText);
                this.setState({ data: msg });
            }
            else {
                alert('Request failed.  Returned status of ' + xhr.status);
            }
        }.bind(this);

        xhr.send();
    },
    handleCommentSubmit: function (comment) {
        var comments = this.state.data;
        comment.id = Date.now();
        var newComments = comments.concat([comment]);
        this.setState({ data: newComments });

        var xhr = new XMLHttpRequest();
        xhr.open('PUT', 'myservice/user/1234');
        xhr.setRequestHeader('Content-Type', 'application/json');

http://blog.garstasio.com/you-dont-need-jquery/ajax/


        console.log(comment);
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                this.setState({ data: comments });
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function () {
        return (
            <div className="commentBox">
                <h1>Activity</h1>
                <CommentList data={this.state.data} />
                <ActivityForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment activity={comment.activity} key={comment.id}>
                    {comment.distance}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var ActivityForm = React.createClass({
    getInitialState: function () {
        return { activity: '', distance: 0 };
    },
    handleAuthorChange: function (e) {
        this.setState({ activity: e.target.value });
    },
    handleTextChange: function (e) {
        this.setState({ distance: e.target.value });
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var activity = this.state.activity.trim();
        var distance = this.state.distance;
        if (!distance || !activity) {
            return;
        }
        this.props.onCommentSubmit({ activity: activity, distance: distance });
        this.setState({ activity: '', distance: 0 });
    },
    render: function () {
        return (
            <form className="ActivityForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Activity"
                    value={this.state.activity}
                    onChange={this.handleAuthorChange}
                    />
                <input
                    type="text"
                    placeholder="Distance"
                    value={this.state.distance}
                    onChange={this.handleTextChange}
                    />
                <input type="submit" value="Post" />
            </form>
        );
    }
});

ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval={2000} />,
    document.getElementById('content')
);
