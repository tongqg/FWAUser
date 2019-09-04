import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Grid
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "./ListToolbar";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
    margin: 10
  },
  badge: {
    display: "inline-block",
    textAlign: "center",
    fontSize: "8px",
    background: "green",
    color: "white",
    borderRadius: "5px",
    padding: "0 4px"
  },
  footer: {
    textAlign: "center",
    paddingLeft: "18px"
  }
});

class DynamicList extends React.Component {
  state = {
    item: "",
    isValid: true,
    instruction: ""
  };

  handleInputChange = event => {
    this.setState({ item: event.target.value });
    this.props.validator(event.target.value, (result, message) => {
      this.setState({
        isValid: result,
        instruction: message
      });
    });
  };

  handleKeyPress = event => {
    if (event.keyCode === 13) {
      this.handleAddItem();
    }
  };

  handleAddItem = () => {
    if (this.state.isValid && this.state.item !== "") {
      this.props.handleAdd(this.state.item);
      this.setState({ item: "", instruction: "", isValid: true });
    }
  };

  render() {
    const { classes, name, placeholder, list, handleDelete } = this.props;

    return (
      <Grid>
        <Toolbar
          name={name}
          placeholder={placeholder}
          itemName={this.state.item}
          inputChange={this.handleInputChange}
          keyPress={this.handleKeyPress}
          addListItem={this.handleAddItem}
          isValid={this.state.isValid}
          instruction={this.state.instruction}
        />
        <List dense={true}>
          {list.map((value, index) => (
            <ListItem key={index} dense button>
              <ListItemText
                primary={<React.Fragment>{value.label}</React.Fragment>}
                secondary={
                  <React.Fragment>
                    <span className={classes.badge}>{value.type}</span>
                  </React.Fragment>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="Delete"
                  name="Delete"
                  onClick={() => handleDelete(value.id)}
                >
                  <ClearIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Grid>
    );
  }
}

export default withStyles(styles)(DynamicList);
