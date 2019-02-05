import React, { Component } from "react";
import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
import awsmobile from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import styled from "styled-components";
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

if (dd < 10) {
  dd = "0" + dd;
}

if (mm < 10) {
  mm = "0" + mm;
}

today = mm + "/" + dd + "/" + yyyy;

Amplify.configure(awsmobile);
let json;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { NewMoodTitle: "", NewMoodType: "" };

    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const allTodos = await API.graphql(graphqlOperation(queries.listMoodItems));
    console.log("AT", allTodos);

    json = await Auth.currentAuthenticatedUser();
    console.log("user", json.attributes);
  }

  handleChange(value, name) {
    this.setState(state => {
      return (state[name] = value);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>add: </div>
          <input
            onChange={e => {
              this.handleChange(e.target.value, "NewMoodTitle");
            }}
            value={this.state.NewMoodTitle}
          />
          <input
            onChange={e => {
              this.handleChange(e.target.value, "NewMoodType");
            }}
            value={this.state.NewMoodType}
          />
          <button
            onClick={async () => {
              var moodDetails = {
                date: today,
                note: this.state.NewMoodTitle,
                mood: this.state.NewMoodType
              };
              const newMood = await API.graphql(
                graphqlOperation(mutations.createMoodItem, {
                  input: moodDetails
                })
              );
              console.log("BPM ", newMood);
            }}
          />
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
