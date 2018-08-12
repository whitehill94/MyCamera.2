/**
 <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import Camera from 'react-native-camera';





export default class MyCamera extends Component {
  render() {
    return (
      <View style={styles.container}>
       <Camera
           ref={(cam) => {
             this.camera = cam;
           }}
           style={styles.preview}
           aspect={Camera.constants.Aspect.fill}>
          
          <TouchableOpacity style={styles.button} onPress={this.takePicture.bind(this)}>
          <Image source={require("./resources/images/shutter_button.png")}/>
          </TouchableOpacity> 
       </Camera>
      </View>
    );
  }

  takePicture() {
   this.camera.capture()
     .then((data) => console.log(data))
     .catch(err => console.error(err));
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  preview: {
   flex: 1,
   justifyContent: 'flex-end',
   alignItems: 'center',
   height: Dimensions.get('window').height,
   width: Dimensions.get('window').width
 },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    color: '#000',
    paddingRight: 20,
    margin: 40
  }
});

AppRegistry.registerComponent('MyCamera', () => MyCamera);
