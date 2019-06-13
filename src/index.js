import React from 'react';
import { StatusBar, TabBarIOS, StyleSheet } from 'react-native';
import { DrawerNavigator } from "react-navigation";
import { Root } from 'native-base';

import { Login, EventRoot } from './views';
import ColorConfig from './config/color.config';


const Index = DrawerNavigator(
    {
        login: {
            screen: Login,
            navigationOptions: ({ navigation }) => ({
                drawerLockMode: 'locked-closed'
            })
        },
        EventRoot: {
            screen: EventRoot,
            navigationOptions: ({ navigation }) => ({
                drawerLockMode: 'locked-closed'
            })
        }
    },
    // {
    //     initialRouteName: 'EventRoot',        
    // }
);

export default () =>
    <Root>
        <StatusBar hidden />
        <Index style={styles.baseContainer} />
    </Root>;


const styles = StyleSheet.create({
    baseContainer: {
        backgroundColor: ColorConfig.MAIN_BACKGROUND
    }
});