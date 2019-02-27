import React, { useState } from "react";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import * as subscriptions from "./graphql/subscriptions";
import styled from "styled-components";
import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";

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

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function MoodForm() {
  // Declare a new state variable, which we'll call "count"
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");

  async function getUserValues() {
    let allMoods = await API.graphql(graphqlOperation(queries.listMoodItems));
    console.log("moods", allMoods);

    let currentuser = await Auth.currentAuthenticatedUser();
    console.log("user", currentuser.attributes);
  }

  getUserValues();

  return (
    <div className="App">
      <header className="App-header">
        <FormContainer>
          <div>Enter Today's Mood: </div>
          <span>Mood Type</span>
          <input
            onChange={e => {
              setType(e.target.value);
            }}
            value={type}
          />
          <span>Notes:</span>
          <input
            onChange={e => {
              setTitle(e.target.value);
            }}
            value={title}
          />
          <button
            onClick={async () => {
              var moodDetails = {
                date: today,
                note: title,
                mood: type
              };
              await API.graphql(
                graphqlOperation(mutations.createMoodItem, {
                  input: moodDetails
                })
              );
            }}
          >
            add
          </button>
        </FormContainer>
      </header>
    </div>
  );
}

export default MoodForm;
