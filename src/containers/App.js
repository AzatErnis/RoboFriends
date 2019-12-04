import React from "react";
import Cardlist from "../components/Cardlist";
import Searchbox from "../components/Searchbox";
import Scroll from "../components/Scroll";
import "./app.css";

class App extends React.Component {
  state = {
    robots: [],
    searchfield: ""
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(robots => this.setState({ robots: robots }));
  }

  onSearchChange = event => this.setState({ searchfield: event.target.value });

  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot =>
      robot.name.toLowerCase().includes(searchfield.toLowerCase())
    );

    const { onSearchChange } = this;
    return !robots.length ? (
      <h1 className="tc">Loading...</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <Searchbox searchChange={onSearchChange} />
        <Scroll>
          <Cardlist robots={filteredRobots} />
        </Scroll>
      </div>
    );
  }
}

export default App;
