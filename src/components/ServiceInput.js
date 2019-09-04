import React from "react";

import DynamicList from "./DynamicList";

class ServiceInput extends React.Component {
  isValidPort = port => port !== "" && !isNaN(port);

  isValidProtocol = protocol =>
    protocol.toLowerCase() === "tcp" || protocol.toLowerCase() === "udp";

  serviceValidator = (service, callback) => {
    let result = false;
    let message = "";
    if (service.indexOf("/") < 0) {
      message = "Please enter protocol and port separated by /";
    } else {
      let twoparts = service.split("/");
      if (!this.isValidProtocol(twoparts[0])) {
        message = 'Please enter "tcp" or "udp" as the protocol';
      } else if (!this.isValidPort(twoparts[1])) {
        message = "Please enter a valid port";
      } else {
        result = true;
        message = 'Click "+" to add';
      }
    }
    callback(result, message);
  };

  render() {
    const { name, list, handleAdd, handleDelete } = this.props;
    return (
      <DynamicList
        name={name}
        placeholder="tcp/80"
        list={list}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        validator={this.serviceValidator}
      />
    );
  }
}

export default ServiceInput;
