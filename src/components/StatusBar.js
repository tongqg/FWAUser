import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { deepOrange, green, grey } from "@material-ui/core/colors";
import { Typography, Grid, Button } from "@material-ui/core";
// import Typing from "react-typing-animation";
import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
  avatarAllow: {
    margin: 10,
    height: 80,
    width: 80,
    backgroundColor: green[300]
  },
  avatarDeny: {
    margin: 10,
    height: 80,
    width: 80,
    backgroundColor: deepOrange[300]
  },
  avatarMoreInfo: {
    margin: 10,
    height: 80,
    width: 80,
    backgroundColor: grey[300]
  },
  request: {
    marginLeft: "auto"
  }
});

class StatusBar extends React.Component {
  render() {
    const { classes } = this.props;
    var avatarClassName;
    switch (this.props.result) {
      case "Allow":
        avatarClassName = classes.avatarAllow;
        break;
      case "Deny":
        avatarClassName = classes.avatarDeny;
        break;
      default:
        avatarClassName = classes.avatarMoreInfo;
    }

    return (
      <Grid container direction="row" alignItems="center">
        <Avatar className={avatarClassName}>{this.props.result}</Avatar>
        <Typography variant="inherit" color="textSecondary" component="div">
          {/* <Typing>{this.props.instruction}</Typing> */}
          {this.props.instruction}
        </Typography>
        <Grid className={classes.request}>
          <Button
            variant="outlined"
            color="primary"
            disabled={this.props.result !== "Deny"}
          >
            request
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(StatusBar);
