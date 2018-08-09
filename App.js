import React from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Easing
} from 'react-native';

import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import CircleTransition from './src/components/CircleTransition.js';

const { width, height } = Dimensions.get('window');
const screens = [{
  id: 0,
  bgcolor: '#698FB2'
}, {
  id: 1,
  bgcolor: '#68B0B3'
}, {
  id: 2,
  bgcolor: '#9B91BA'
}];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _counter: 0,
      currentbg: screens[0].bgcolor
    };
  }

  changeColor(newColor) {
    this.setState({
      currentbg: newColor
    });
  }

  onSwipeLeft() {
    console.log("left");
    const { _counter } = this.state;
    let newCounter = _counter < screens.length - 1 ? _counter + 1 : 0;
    this.swipeTo(newCounter);
  }
  onSwipeRight() {
    console.log("right");
    const { _counter } = this.state;
    let newCounter = _counter === 0 ? screens.length - 1 : _counter - 1;
    this.swipeTo(newCounter);
  }

  swipeTo(counter) {
    const newColor = screens[counter].bgcolor;
    this.setState({
      _counter: counter
    }, () => {
      this.circleTransition.start(newColor, this.changeColor.bind(this, newColor));
    });
  }

  onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_LEFT:
        this.onSwipeLeft();
        break;
      case SWIPE_RIGHT:
        this.onSwipeRight();
        break;
    }
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <GestureRecognizer onPress={this.onPress.bind(this)}
        style={[styles.container, { backgroundColor: this.state.currentbg }]}
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        config={config}
      >
        <CircleTransition
          ref={(circle) => { this.circleTransition = circle }}
        />
      </GestureRecognizer>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
});