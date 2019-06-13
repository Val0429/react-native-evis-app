import React from 'react';

import { StatusBar,AppState, StyleSheet, TouchableHighlight, Animated, AppRegistry, Dimensions, Switch, View, Image, TouchableOpacity } from 'react-native';
import { Button, Text, Container, Content, Form, Item, Input, Icon, Left, Body, Right, Label, Header, Title, Spinner, Footer, FooterTab } from 'native-base';

import autobind from 'class-autobind';
import iStyle from '../../styles/webbuilding-styles';
import AlertHelper from '../../helpers/alert.helper';
import ColorConfig from '../../config/webbuilding.color.config';
import StorageHelper from '../../helpers/storage.helper';
import { StorageKeys } from '../../domain/storage';

export class UserInfo extends React.Component {

    constructor(props) {
        super(props);
        autobind(this);

        this.state = {
            deviceToken: '',
            deviceId: '',
            deviceType: '',
            deivceUID: ''
        };

        this.handleAppStateChange = this.handleAppStateChange.bind(this);

        this.getDeviceInformation();
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange = (nextAppState) => {
        if (nextAppState.match(/inactive|background/)) {

            this.goBack();

        }
    }

    render() {

        var pjson = require('../../../package.json');

        return (
            <Container style={iStyle.baseContainer}>
                <Header style={iStyle.header}>
                    <Left>
                        <TouchableOpacity style={{ width: 80 }} onPress={() => {
                            this.goBack();
                        }}>
                            <Icon style={{ color: ColorConfig.MAIN_WHITE, fontSize: 28 }} name="ios-arrow-back" />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title style={{ color: ColorConfig.MAIN_WHITE, fontSize: 24 }}>EVIS</Title>
                    </Body>
                    <Right>
                        {/* <Button iconRight light onPress={() => {
                    this.logout();
                }}>
                    <Text>Logout</Text>
                </Button> */}
                    </Right>
                </Header>
                <Content padder contentContainerStyle={styles.event_content} scrollEnabled={true}>
                    {/* <Text style={styles.title}>个人资讯</Text> */}
                    <Text style={styles.title}>装置资讯</Text>
                    <Text style={styles.sub_title}>App 版本</Text>
                    <Text style={styles.info_text}>{pjson.version}</Text>
                    <Text style={styles.sub_title}>装置识别码</Text>
                    <Text style={styles.info_text}>{this.state.deviceId}</Text>
                    <Text style={styles.sub_title}>装置类型</Text>
                    <Text style={styles.info_text}>{this.state.deviceType}</Text>
                    <Text style={styles.sub_title}>装置序号</Text>
                    <Text style={styles.info_text}>{this.state.deviceToken}</Text>
                    <Text style={styles.sub_title}>唯一码</Text>
                    <Text style={styles.info_text}>{this.state.deivceUID}</Text>
                    <Text style={styles.sub_title}>推播注册状态</Text>
                    <Text style={styles.info_text}>{this.state.resgist_notification ? '注册成功' : '注册失败'}</Text>
                    
                </Content>
            </Container>
        )
    }

    getDeviceInformation() {

        StorageHelper.getStorage(StorageKeys.deviceInfo)
            .then(config => {

                this.setState({
                    deviceType: config.push_device_type,
                    deviceId: config.push_device_name,
                    deviceToken: config.push_device_token,
                    deivceUID: config.push_device_uuid,
                    resgist_notification : config.resgist_notification
                });
            })
            .catch((error) => {
                AlertHelper.displayToast('Get Device Token Failed.');
            });
    }

    goBack() {
        this.props.navigation.goBack();
        this.props.navigation.state.params.onActiveTimer();
    }
}


const styles = StyleSheet.create({
    title:{
        fontSize:24,
        color:'#808080',
        padding:3,
        borderColor:'#dddddd',
        borderBottomWidth:2,
        marginBottom:15
    },
    sub_title:{
        fontSize:18,
        color:'#dddddd',
        padding:3,
        marginBottom:5
    },
    info_text:{
        fontSize:18,
        color:'#808080',
        padding:3,
        marginBottom:5
    },
    event_content: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});