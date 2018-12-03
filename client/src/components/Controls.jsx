
import React from 'react';

class Controls extends React.Component {
  constructor(props) {
    super();
    this.state = {
    };
  }

  render() {
    const {
      deal, hit, stay, player, stage,
    } = this.props;
    if (stage === 'play') {
      return (
        <div>
          <h2>Controls</h2>
          <div>
            <button type="submit" onClick={() => hit()}>Hit</button>
          </div>
          <button type="submit" onClick={() => stay()}>Stay</button>
        </div>
      );
    }
    return (
      <div>
        <h2>Controls</h2>
        <div>
          Bet:
          {' '}
          <input type="number" name="quantity" min="1" max={player.money} />
        </div>
        <button type="submit" onClick={() => deal()}>Deal</button>
      </div>
    );
  }
}

export default Controls;
