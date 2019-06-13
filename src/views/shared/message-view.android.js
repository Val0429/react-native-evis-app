import React, { Component } from 'react';
import {
  requireNativeComponent,
  NativeModules,
  AppRegistry,
  findNodeHandle,
  
} from 'react-native';

const UIManager = NativeModules.UIManager;
const DispatchManager = UIManager.dispatchViewManagerCommand;
const Commands = UIManager.MessageView.Commands;

var NativeImageView = requireNativeComponent('MessageView', MessageView, {
});
  
export class MessageView extends React.Component {
  constructor(props) {
    super(props);
  }
  
//   setNumber(value) {
// 	  DispatchManager(findNodeHandle(this.refs.native), Commands.what, ['setNumber', value])
//   }
  
  
  helloworld() {
    console.log('click hello')
	  DispatchManager(findNodeHandle(this.refs.native), Commands.what, ['hello'])
  }

  render(){
        return <NativeImageView 
            ref="native"
            {...this.props}
            />;
    }
}

AppRegistry.registerComponent('MessageView', () => MessageView);