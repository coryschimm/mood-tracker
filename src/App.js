import React, { Component } from "react";
import Amplify from "aws-amplify";
import awsmobile from "./aws-exports";
import MoodForm from "./newEditMood";
import { withAuthenticator } from "aws-amplify-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

Amplify.configure(awsmobile);

class App extends Component {
  render() {
    //this.getUserValues();
    return (
      <Router>
        <Route path="/" exact component={MoodForm} />
      </Router>
    );
  }
}

const MyTheme = {
  googleSignInButton: { backgroundColor: "red", borderColor: "red" },
  button: { backgroundColor: "green", borderColor: "red" },
  signInButtonIcon: { display: "none" }
};

console.log("withAuthenticator", withAuthenticator);

export default withAuthenticator(App, false, [], null, MyTheme, {
  hiddenDefaults: ["phone_number"],
  signUpFields: [{ label: "Name", key: "name", required: true, type: "string" }]
});
