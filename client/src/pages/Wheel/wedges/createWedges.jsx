import React, { Fragment } from 'react';
import './styleWedges.css';

class Wedges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: this.props.sources,
      rotations: (this.props.rotations || 8) * 360,
      wedges: null,
    };
  }

  componentDidMount() {
    this.createWedges();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.sources !== this.props.sources ||
      prevState.rotations !== this.state.rotations
    ) {
      this.createWedges();
    } else if (prevProps.rotations !== this.props.rotations) {
      this.setState({ rotations: (this.props.rotations || 8) * 360 });
    }
  }

  triangleStyle(numOfWedges) {
    let leftSideObj = {
      10: 19,
      11: 23,
      12: 26,
      13: 30,
      14: 32,
      15: 34,
      17: 35.5,
      18: 35.6,
      20: 36,
      30: 40,
      40: 43,
      50: 44,
      60: 45.5,
      70: 45.7,
      80: 45.8,
      90: 45.9,
      100: 47.2,
    };
    let rightSideObj = {
      10: 81,
      11: 79,
      12: 77.5,
      13: 76,
      14: 75,
      15: 74,
      17: 70.5,
      18: 69,
      20: 66,
      30: 60,
      40: 58,
      50: 56,
      60: 55,
      70: 54,
      80: 53,
      90: 52.5,
      100: 52.8,
    };
    let numAsString = '' + numOfWedges;
    let onesPlace = +numAsString[numAsString.length - 1];
    if (rightSideObj[numOfWedges]) {
      return {
        clipPath: `polygon(50% 100%, ${leftSideObj[numOfWedges]}% 0%, ${rightSideObj[numOfWedges]}% 0%)`,
      };
    } else {
      let tensPlace = +('' + numOfWedges)[0];
      let lowerRange = +(tensPlace + '0');
      let upperRange = +('' + (tensPlace + 1) + '0');
      if (numOfWedges < 20 && numOfWedges > 15) {
        lowerRange = null;
        upperRange = null;
        let counter = 1;
        while (!lowerRange || !upperRange) {
          if (rightSideObj[numOfWedges + counter])
            upperRange = numOfWedges + counter;
          if (rightSideObj[numOfWedges - counter])
            lowerRange = numOfWedges - counter;
          counter++;
        }
      }
      let range = [lowerRange, upperRange];

      let [leftSlope, rightSlope] = this.findTheSlope(
        range,
        leftSideObj,
        rightSideObj,
      );
      let xRight = rightSlope * onesPlace + rightSideObj[lowerRange];
      let xLeft = leftSlope * onesPlace + leftSideObj[lowerRange];

      return {
        clipPath: `polygon(50% 100%, ${xLeft}% 0%, ${xRight}% 0%)`,
      };
    }
  }

  findTheSlope(range, leftKey, rightKey) {
    let lowerRange = range[0];
    let upperRange = range[1];

    let leftSlope = (leftKey[upperRange] - leftKey[lowerRange]) / 10;

    let rightSlope = (rightKey[upperRange] - rightKey[lowerRange]) / 10;

    return [leftSlope, rightSlope];
  }

  createWedges() {
    const wedges = [];
    const totalWedges = Object.keys(this.props.sources).length;
    const degree = 360 / totalWedges;
    let rotateBy = 0;
    const selected = Math.floor(Math.random() * totalWedges);
    let result;
    let triangleStyle = this.triangleStyle(totalWedges);
    for (let key in this.props.sources) {
      const rotation = {
        transform: `rotate(${rotateBy}deg)`,
      };

      if (key == selected || (selected == 0 && key == 1)) {
        result = this.props.sources[key]['result'];
      }

      wedges.push(
        <div key={key} style={rotation} className={`scaleDiv wedgePosition`}>
          <div style={triangleStyle} className={'triangleTransform'}>
            <div>
              <img
                className={'sourceImage'}
                src={`${this.props.sources[`${key}`]['image']}`}
                alt='preview'
              />
            </div>
          </div>
        </div>,
      );
      rotateBy += degree;
    }

    this.props.setResult(
      result,
      this.spinBy(degree, selected) + this.state.rotations,
    );

    this.setState({
      wedges: wedges,
    });
  }

  spinBy(degree, selected) {
    return degree * selected - degree < 0 ? 0 : -(degree * selected - degree);
  }

  render() {
    return <Fragment>{this.state.wedges}</Fragment>;
  }
}

export default Wedges;
