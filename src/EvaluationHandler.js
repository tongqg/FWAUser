import React from "react";

class EvaluationHandler extends React.Component {
  state = {
    sources: [],
    destinations: [],
    services: [],
    result: "N/A",
    instruction: 'Please enter "from" first'
  };

  componentDidMount() {}

  static getDerivedStateFromProps(props, state) {
    if (state.sources.length === 0) {
      return {
        instruction:
          'Please enter IP addresses in "From" field and click "+" button to add'
      };
    } else if (state.destinations.length === 0) {
      return {
        instruction:
          'Please enter IP addresses in "From" or "To" fields and click "+" button to add'
      };
    } else if (state.result === "N/A") {
      return {
        instruction:
          'Please enter protocol and port in "Service" field and click "+" button to add'
      };
    } else {
      return { instruction: "Check the details here" };
    }
  }

  generateResult = () => {
    let result = "";
    if (
      this.state.sources.length === 0 ||
      this.state.destinations.length === 0 ||
      this.state.services.length === 0
    ) {
      result = "N/A";
    } else {
      result = "Allow";
    }
    this.setState({ result: result });
  };

  makeNetworkObject = (ip, zone, callback) => {
    callback({
      id: ip,
      label: ip,
      type: "vm",
      zone: zone
    });
  };

  makeServiceObject = service => ({
    id: service,
    label: service.split("/")[1],
    type: service.split("/")[0]
  });

  handleNetworkObjectAdd = name => zone => ip => {
    let statelist = this.state[name];
    this.makeNetworkObject(ip, zone, obj => {
      statelist.unshift(obj);
      this.setState({
        [name]: statelist
      });
      this.generateResult();
    });
  };

  handleObjectDelete = name => id => {
    let statelist = this.state[name];
    let index = -1;
    statelist.forEach((v, i) => {
      if (v.id === id) {
        index = i;
      }
    });
    if (index !== -1) {
      statelist.splice(index, 1);
      this.setState({ [name]: statelist });
    }
  };

  handleServiceObjectAdd = service => {
    let { services } = this.state;
    services.unshift(this.makeServiceObject(service));
    this.setState({ services: services });
    this.generateResult();
  };

  render() {
    const { render } = this.props;
    return render({
      ...this.state,
      handleAddFrom: this.handleNetworkObjectAdd("sources"),
      handleDeleteFrom: this.handleObjectDelete("sources"),
      handleAddTo: this.handleNetworkObjectAdd("destinations"),
      handleDeleteTo: this.handleObjectDelete("destinations"),
      handleServiceAdd: this.handleServiceObjectAdd,
      handleServiceDelete: this.handleObjectDelete("services")
    });
  }
}

export default EvaluationHandler;
