import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
import awsmobile from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import * as queries from "./graphql/queries";
Amplify.configure(awsmobile);
let json;
class App extends Component {
  async componentDidMount() {
    const allTodos = await API.graphql(graphqlOperation(queries.listMoodItems));
    console.log(allTodos);

    json = await Auth.currentAuthenticatedUser();
    console.log("user", json.attributes);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default withAuthenticator(App, {
  signUpConfig: {
    hiddenDefaults: ["phone_number"],
    signUpFields: [
      { label: "Name", key: "name", required: true, type: "string" }
    ]
  }
});
