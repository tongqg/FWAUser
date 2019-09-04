import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Divider, Grid } from "@material-ui/core";
import { Address4 } from "ip-address";

import DynamicList from "./DynamicList";

const styles = theme => ({
  root: {
    marginRight: 20
  },
  footer: {
    textAlign: "center"
  }
});

class NetworkInput extends React.Component {
  state = {
    zone: "n/a"
  };

  networkValidator = zone => (ip, callback) => {
    let result = this.isValidIp(ip);
    var message;
    if (!result) {
      message = "Please enter a valid ip";
      callback(result, message);
    } else {
      this.getZone(ip, zone => {
        if (this.state.zone !== "n/a" && zone !== this.state.zone) {
          result = false;
          message = "Please enter an IP in the same zone as " + this.state.zone;
        } else {
          this.setState({ zone: zone });
          message = 'Click "+" button to add';
        }
        callback(result, message);
      });
    }
  };

  getZone = (ip, callback) => {
    const zone = "dev";
    callback(zone);
  };

  isValidIp = ip => new Address4(ip).isValid();

  handleDeleteItem = item => {
    if (this.props.list.length === 1) {
      this.setState({ zone: "n/a" });
    }
    this.props.handleDelete(item);
  };

  render() {
    const { classes, name, list, handleAdd } = this.props;
    return (
      <Grid className={classes.root}>
        <DynamicList
          name={name}
          list={list}
          placeholder=""
          handleAdd={handleAdd(this.state.zone)}
          handleDelete={this.handleDeleteItem}
          validator={this.networkValidator(this.state.zone)}
        />
        <Divider />
        <Typography
          color="textSecondary"
          component="div"
          className={classes.footer}
        >
          zone: {this.state.zone}
        </Typography>
      </Grid>
    );
  }
}

export default withStyles(styles)(NetworkInput);
