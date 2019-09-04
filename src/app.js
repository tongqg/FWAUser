import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import Nav from "./nav";
import Evaluation from "./Evaluation";

const App = () => (
  <Grid>
    <Nav />
    <Grid container direction="column" justify="center" alignItems="center">
      <Evaluation />
    </Grid>
  </Grid>
);

export default App;
