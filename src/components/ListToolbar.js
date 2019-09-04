import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Input,
  InputLabel,
  FormHelperText,
  FormControl,
  IconButton,
  Grid
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  input: {
    flex: 1,
    marginLeft: 16
  },
  toolbar: {
    display: "flex",
    flexDirection: "row"
  },
  toolbarButton: {
    margin: 4,
    padding: 20
  }
});

const ListToolbar = props => {
  const {
    classes,
    name,
    placeholder,
    itemName,
    inputChange,
    keyPress,
    addListItem,
    isValid,
    instruction
  } = props;

  return (
    <Grid className={classes.toolbar}>
      <FormControl variant="outlined" error={!isValid}>
        <InputLabel>{name}</InputLabel>
        <Input
          className={classes.input}
          id="item"
          value={itemName}
          onChange={inputChange}
          onKeyDown={keyPress}
          placeholder={placeholder}
        />
        <FormHelperText className={classes.input}>{instruction}</FormHelperText>
      </FormControl>
      <IconButton
        aria-label="Add"
        onClick={addListItem}
        className={classes.toolbarButton}
      >
        <AddIcon />
      </IconButton>
    </Grid>
  );
};

export default withStyles(styles)(ListToolbar);
