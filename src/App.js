import React, { Component } from "react";
import Amplify from "aws-amplify";
import awsmobile from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import MoodForm from "./newEditMood";

Amplify.configure(awsmobile);

class App extends Component {
  render() {
    //this.getUserValues();
    return <MoodForm />;
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
