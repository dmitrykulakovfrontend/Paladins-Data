import React, { Fragment } from 'react';
import './displayComponentStyle.css';
import Wedges from './wedges/createWedges.jsx';

class SpinningWheel extends React.Component {
  constructor(props) {
    super(props);
    this.startSpin = this.startSpin.bind(this);
    let numberOfSources = this.props.numberOfSources;
    if (!numberOfSources || numberOfSources < 10) {
      numberOfSources = 10;
    }
    this.state = {
      width: this.props.width,
      sources: this.props.sources,
      numberOfSources: numberOfSources,
      backgroundColor: this.props.backgroundColor || 'orange',
      outerRingColor: this.props.outerRingColor || 'white',
      buttonColor: this.props.buttonColor || 'orange',
      durationOfSpin: this.props.durationOfSpin || 5,
      showWedges: this.props.showWedges === false ? false : true,
      fadeInTime: this.props.fadeInTime || 1,
      spinning: false,
      wedgeSources: {},
      spinBy: 0,
      resultLocation: 0,
      result: '',
      displayResult: false,
      disableButton: false,
      updateWheel: false,
      setToZero: false,
      firstSpin: true,
      loadInResult: false,
    };
  }
  componentDidMount() {
    if (typeof this.state.sources === 'function') {
      this.getWedges();
    } else {
      let sources = this.state.sources;
      let currentValues = Object.values(sources);
      if (currentValues.length < this.state.numberOfSources) {
        sources = this.properNumberOfSources(currentValues);
      }
      this.setWedges(sources);
    }
  }

  properNumberOfSources(sources) {
    let currentValues = Object.values(sources);
    while (currentValues.length < this.state.numberOfSources) {
      currentValues = [...currentValues, ...currentValues];
    }
    currentValues = currentValues.slice(0, this.state.numberOfSources);
    const newSources = this.createShuffleObj(currentValues);
    return newSources;
  }

  createShuffleObj(array) {
    let sources = {};
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    for (var k = 0; k < array.length; k++) {
      sources[k + 1] = array[k];
    }
    return sources;
  }

  getWedges() {
    if (typeof this.state.sources === 'function') {
      return this.state.sources().then((payload) => {
        let currentValues = Object.values(payload);
        if (
          currentValues.length < this.state.numberOfSources ||
          currentValues.length > this.state.numberOfSources
        ) {
          payload = this.properNumberOfSources(currentValues);
        }
        this.setWedges(payload);
      });
    } else {
      let newOrder = this.createShuffleObj(
        Object.values(this.state.wedgeSources),
      );
      this.setWedges(newOrder);
    }
  }

  setWedges(sources) {
    this.setState({
      spinning: false,
      wedgeSources: sources,
      spinBy: 0,
      resultLocation: 0,
      displayResult: false,
      updateWheel: false,
      setToZero: true,
      result: null,
      loadInResult: false,
    });
  }

  setResult(result, resultLocation) {
    this.setState({
      result: result,
      resultLocation: resultLocation,
      loadInResult: true,
    });
  }

  // resetWheel() {
  //   this.setState({
  //     numberOfSources: this.props.numberOfSources,
  //     spinBy: 0,
  //     resultLocation: 0,
  //     displayResult: false,
  //     updateWheel: false,
  //     setToZero: true,
  //     result: null,
  //     loadInResult: false,
  //     spinning: false,
  //     firstSpin: true,
  //     showWedges: this.props.showWedges === false ? false : true
  //   });
  // }

  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.numberOfSources !== this.props.numberOfSources) {
    //   this.resetWheel();
    // } else if (prevState.numberOfSources !== this.state.numberOfSources) {
    //   this.getWedges();
    // } else if (prevProps.sources !== this.props.sources) {
    //   this.setState({ sources: this.props.sources });
    // } else if (prevState.sources !== this.state.sources) {
    //   this.setWedges(this.state.sources);
    // } else if (prevProps.durationOfSpin !== this.props.durationOfSpin) {
    //   this.setState({ durationOfSpin: this.props.durationOfSpin || 5 });
    // } else if (prevProps.fadeInTime !== this.props.fadeInTime) {
    //   this.setState({ fadeInTime: this.props.fadeInTime || 1 });
    // } else if (prevProps.showWedges !== this.props.showWedges) {
    //   this.resetWheel();
    // } else
    if (
      !this.state.firstSpin &&
      !this.state.updateWheel &&
      prevState.result !== this.state.result
    ) {
      this.startSpin();
    } else if (
      prevState.result !== this.state.result &&
      this.state.showWedges &&
      this.state.spinning
    ) {
      this.startSpin();
    } else if (this.state.disableButton) {
      setTimeout(() => {
        this.setState({
          displayResult: true,
          disableButton: false,
          spinning: false,
          updateWheel: true,
        });
      }, this.state.durationOfSpin * 1000);
    }
  }

  startSpin() {
    if (this.state.updateWheel) {
      this.getWedges();
    } else if (!this.state.showWedges) {
      this.setState({
        showWedges: true,
        spinning: true,
      });
    } else {
      this.setState({
        spinBy: this.state.resultLocation,
        disableButton: true,
        spinning: true,
        setToZero: false,
        firstSpin: false,
      });
    }
  }

  circleStyle() {
    if (!this.state.setToZero) {
      return {
        backgroundColor: `${this.props.backgroundColor}`,
        boxShadow: `0px 0px 0px 12px
        ${this.props.outerRingColor}`,
        transform: `translate(-50%, 0%) rotate(${this.state.spinBy}deg)`,
        transitionDuration: `${this.state.durationOfSpin}s`,
      };
    } else {
      return {
        backgroundColor: `${this.props.backgroundColor}`,
        boxShadow: `0px 0px 0px 12px
        ${this.props.outerRingColor}`,
        transform: `translate(-50%, 0%) rotate(0deg)`,
      };
    }
  }

  buttonStyle() {
    if (this.state.displayResult) {
      return {
        backgroundColor: this.props.buttonColor,
        transition: `opacity ${this.state.fadeInTime}s`,
        opacity: '.5',
        border: `4px solid ${this.props.buttonBorder}`,
      };
    } else {
      return {
        backgroundColor: this.props.buttonColor,
        border: `4px solid ${this.props.buttonBorder}`,
      };
    }
  }

  displayResultStyle() {
    if (this.state.displayResult) {
      return {
        transition: `opacity ${this.state.fadeInTime}s`,
        opacity: '1',
        zIndex: '4',
      };
    } else {
      return {
        opacity: '0',
      };
    }
  }

  render() {
    let circleState = this.circleStyle();
    let buttonStyle = this.buttonStyle();
    let displayResultStyle = this.displayResultStyle();
    let pointerColor = this.props.outerRingColor
      ? {
          borderColor: `${this.props.outerRingColor} transparent transparent`,
        }
      : { borderColor: `white transparent transparent` };

    let displayResult =
      this.state.loadInResult && this.state.result ? (
        <div style={displayResultStyle} className={'displayResult'}>
          {this.props.displayResult(this.state.result)}
        </div>
      ) : null;

    const displayWedges = this.state.showWedges ? (
      <Wedges
        sources={this.state.wedgeSources}
        rotations={this.props.rotations}
        setResult={this.setResult.bind(this)}
      />
    ) : null;
    return (
      <Fragment>
        <div
          className={'min'}
          style={
            this.state.width <= 700
              ? { transform: 'scale(0.6)' }
              : { transform: 'scale(1.1)' }
          }
        >
          {displayResult}
          <div className={'alignmentOnCircle'}>
            <div style={pointerColor} className={'pointer'} />
            <button
              disabled={this.state.disableButton}
              style={buttonStyle}
              className={'spinnerButton'}
              onClick={() => this.startSpin()}
            >
              Spin!
            </button>
          </div>
          <div style={circleState} className={'circleStyle'}>
            <div className={'createCirlce'}>
              <div className={'cirlcePlacement'}>{displayWedges}</div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export { SpinningWheel };

// const spin = { "clipPath": "polygon(50% 100%, 18% 0%, 82% 0%)" };
