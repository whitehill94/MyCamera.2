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
    CameraRoll,
    ScrollView,
    Button,
} from 'react-native';


import Camera from 'react-native-camera';
import { createStackNavigator } from 'react-navigation'



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

                <Button title="Load Images" onPress={this._handleButtonPress}/>


                {this.state.photos.map((p, i) => {
                    <Image
                        key={i}
                        style={{
                            width: 300,
                            height: 100,
                        }}
                        source={{uri: p.node.image.uri}}
                    /> // Closing IMG Tag

                })}

            </View>
        ); //Closing Return 
    } //Closing Render 

    takePicture() {
        this.camera.capture()
            .then((data) => console.log(data))
            .catch(err => console.error(err));
    }// Closing takePicture

    _handleButtonPress = () => {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
        })
            .then(r => {
                this.setState({photos: r.edges});
            })
            .catch((err) => {
                //Error Loading Images
            });
    }; //Closing handleButtonPress

};// Closing MyCamera

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
