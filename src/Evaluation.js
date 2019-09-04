import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Divider, Grid } from "@material-ui/core";
import NetworkInput from "./components/NetworkInput";
import ServiceInput from "./components/ServiceInput";
import StatusBar from "./components/StatusBar";
import EvaluationHandler from "./EvaluationHandler";

const styles = theme => ({
  root: {
    maxWidth: 1000
  },
  content: {
    paddingTop: 10
  }
});

class Evaluation extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <EvaluationHandler
        render={({
          sources,
          sourceZone,
          destinations,
          destinationZone,
          services,
          result,
          instruction,
          handleAddFrom,
          handleDeleteFrom,
          handleAddTo,
          handleDeleteTo,
          handleServiceAdd,
          handleServiceDelete
        }) => (
          <Grid container direction="column" className={classes.root}>
            <StatusBar result={result} instruction={instruction} />
            <Divider />
            <Grid
              container
              direction="row"
              justify="flex-start"
              className={classes.content}
            >
              <NetworkInput
                name="From"
                handleAdd={handleAddFrom}
                handleDelete={handleDeleteFrom}
                list={sources}
                zone={sourceZone}
              />
              <NetworkInput
                name="To"
                handleAdd={handleAddTo}
                handleDelete={handleDeleteTo}
                list={destinations}
                zone={destinationZone}
              />
              <ServiceInput
                name="Service"
                list={services}
                handleAdd={handleServiceAdd}
                handleDelete={handleServiceDelete}
              />
            </Grid>
          </Grid>
        )}
      />
    );
  }
}

export default withStyles(styles)(Evaluation);
