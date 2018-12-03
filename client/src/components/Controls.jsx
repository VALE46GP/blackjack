
import React from 'react';

class Controls extends React.Component {
  constructor({ deal, player }) {
    super();
    this.state = {
    };
  }

  render() {
    const { deal } = this.props;
    return (
      <div>
        <p>Controls</p>
        <div>
          Bet: <input type="number" name="quantity" min="1" max="5" />
        </div>
        <button type="submit" onClick={() => deal()}>Deal</button>
      </div>
    );
  }
}

export default Controls;
