var React = require('react');
var ReactDOM = require('react-dom');

var Lap = React.createClass({
    render: function () {
        return (
            <div className="lap">
                <h2 className="lapHeader">
                    {this.props.unit}
                </h2>
                {this.props.children.toString()}
            </div>
        );
    }
});

var TopLevel = React.createClass({
    getLaps: function () {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', "/api/laps?_=1476854515917");
        var msg;
        xhr.onload = function () {
            if (xhr.status === 200) {
                msg = JSON.parse(xhr.responseText);
                this.setState({ data: msg });
            }
        }.bind(this);

        xhr.send();
    },
    handleLapSubmit: function (lap) {
        var laps = this.state.data;
        lap.id = Date.now();
        var newLaps = laps.concat([lap]);
        this.setState({ data: newLaps });

        var xhr = new XMLHttpRequest();

        xhr.open('POST', '/api/laps');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(lap));
    },
    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        this.getLaps();
        setInterval(this.getLaps, this.props.pollInterval);
    },
    render: function () {
        return (
            <div className="topLevel">
                <h1>Activity</h1>
                <LapList data={this.state.data} />
                <LapForm onLapSubmit={this.handleLapSubmit} />
            </div>
        );
    }
});

var LapList = React.createClass({
    render: function () {
        var lapNodes = this.props.data.map(function (lap) {
            return (
                <Lap unit={lap.unit} key={lap.id}>
                    {lap.distance}
                </Lap>
            );
        });
        return (
            <div className="lapList">
                {lapNodes}
            </div>
        );
    }
});

var LapForm = React.createClass({
    getInitialState: function () {
        return { unit: '', distance: 0 };
    },
    handleUnitChange: function (e) {
        this.setState({ unit: e.target.value });
    },
    handleDistanceChange: function (e) {
        this.setState({ distance: e.target.value });
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var unit = this.state.unit.trim();
        var distance = this.state.distance;
        if (!distance || !unit) {
            return;
        }
        this.props.onLapSubmit({ unit: unit, distance: distance });
        this.setState({ unit: '', distance: 0 });
    },
    render: function () {
        return (
            <form className="LapForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Activity"
                    value={this.state.unit}
                    onChange={this.handleUnitChange}
                    />
                <input
                    type="text"
                    placeholder="Distance"
                    value={this.state.distance}
                    onChange={this.handleDistanceChange}
                    />
                <input type="submit" value="Post" />
            </form>
        );
    }
});

ReactDOM.render(
    <TopLevel url="/api/laps" pollInterval={2000} />,
    document.getElementById('content')
);
