import React, { Component } from 'react';
import { StatusBar } from "react-native";
import { StackNavigator } from 'react-navigation';
import { EventList } from './event-list';
import { EventDetail } from './event-detail';
import { SendMessage } from './send-message';
import { Settings } from './settings';
import { UserInfo } from './user-information';

export const EventRoot = StackNavigator({
    eventList: {
        screen: EventList,
        navigationOptions: {
            header: null
        }
    },
    eventDetail: {
        screen: EventDetail,
        navigationOptions: {
            header: null
        }
    },
    sendmsg: {
        screen: SendMessage,
        navigationOptions: {
            header: null
        }
    },
    settings: {
        screen: Settings,
        navigationOptions: {
            header: null
        }
    },
    userInfo:{
        screen: UserInfo,
        navigationOptions: {
            header: null
        }
    }
});