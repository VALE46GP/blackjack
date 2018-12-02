
import React from 'react';

class Controls extends React.Component {
  constructor(props) {
    super();
    this.state = {
    };
  }

  render() {
    const { deal } = this.props;
    return (
      <div>
        <p>Controls</p>
        <button type="submit" onClick={() => deal()}>Deal</button>
      </div>
    );
  }
}

export default Controls;
