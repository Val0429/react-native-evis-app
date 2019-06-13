import React from 'react';

import { StatusBar, StyleSheet, TouchableHighlight, Animated, AppRegistry, Dimensions, Switch, View, Image, TouchableOpacity } from 'react-native';
import { Button, Text, Container, Content, Form, Item, Input, Icon, Left, Body, Right, Label, Header, Title, Spinner, Footer, FooterTab } from 'native-base';

import autobind from 'class-autobind';
import iStyle from '../../styles/webbuilding-styles';
import AlertHelper from '../../helpers/alert.helper';
import ColorConfig from '../../config/webbuilding.color.config';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';
import moment from 'moment';
import ApiService from '../../service/api.service';
import { AlarmType } from '../../domain/core';

export class EventDetail extends React.Component {

    constructor(props) {
        super(props);
        autobind(this);

        this.state = {
            viewWidth: null,
            eventDetail: this.props.navigation.state.params.eventDetail,
            alarmType: this.props.navigation.state.params.alarmType
        };
    }

    render() {

        console.log('App Console eventDetail : ', this.state.eventDetail);

        let companyName = this.state.eventDetail.company ? this.state.eventDetail.company.name ? this.state.eventDetail.company.name : '' : '';

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
                <View style={styles.event_video}
                    onLayout={this.measureView.bind(this)}>
                    {this.renderVideoPlayer()}
                </View>
                <View style={styles.status_panel}>
                    <Left>
                    </Left>
                    <Right>
                        {/* <TouchableOpacity style={styles.action_handle}>
                            <Icon style={styles.action_icon} name="ios-checkmark-circle" />
                            <Text style={styles.action_handle_text}>已處理</Text>
                        </TouchableOpacity> */}
                    </Right>
                </View>
                <Content padder contentContainerStyle={styles.event_content} scrollEnabled={true}>
                    <View style={styles.event_panel}>
                        <View>
                            <Text style={styles.msg_location}>{companyName}</Text>
                            <Text style={styles.msg_date}>日期：{moment(this.state.eventDetail.timecode).format('YYYY/MM/DD')}</Text>
                            <Text style={styles.msg_time}>時間：{moment(this.state.eventDetail.timecode).format('HH:mm:ss')}</Text>
                        </View>
                        {/* <View style={styles.event_action}>
                            <TouchableOpacity style={styles.action_tag}>
                                <Icon style={styles.action_icon} name="ios-pricetags" />
                                <Text style={styles.action_text}>
                                    添加標籤
                                 </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.action_tag} onPress={() => {
                                this.sendMessage();
                            }}>
                                <Icon style={styles.action_icon} name="md-share" />
                                <Text style={styles.action_text}>
                                    轉發人員
                                </Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </Content>
            </Container>
        );
    }

    renderVideoPlayer() {

        var imgUrl = '';
        var videoUrl = '';

        if (this.state.eventDetail.imgUrl) {
            imgUrl = ApiService.serverUrl + this.state.eventDetail.imgUrl;

            if (this.state.alarmType == AlarmType.FTS) {
                imgUrl = this.state.eventDetail.imgUrl;
            }
        }

        if (this.state.eventDetail.videoUrl) {
            videoUrl = ApiService.serverUrl + this.state.eventDetail.videoUrl;

            if (this.state.alarmType == AlarmType.FTS) {
                videoUrl = this.state.eventDetail.videoUrl;
            }
        }

        if (!this.state.viewHeight && this.state.viewHeight <= 0) {
            Image.getSize(
                ApiService.serverUrl + imgUrl,
                (width, height) => this.setState({ viewHeight: (this.state.viewWidth / width) * height * 3 }),
                console.error
            );
        }
      
        return (
            <VideoPlayer
                // style={{ height: this.state.viewHeight, maxHeight: '100%', width: '100%' }}
                style={{ height: '100%', maxHeight: '100%', width: '100%' }}
                endWithThumbnail
                resizeMode="contain"
                thumbnail={{ uri: imgUrl }}
                video={{ uri: videoUrl }} />
        );
    }

    sendMessage() {
        this.props.navigation.navigate('sendmsg');
    }

    goBack() {
        this.props.navigation.goBack();
        this.props.navigation.state.params.onActiveTimer();
    }

    measureView(event) {

        const viewWidth = event.nativeEvent.layout.width;

        if (!viewWidth || this.state.viewWidth === viewWidth) return;

        this.setState({ viewWidth });
    }
}

const styles = StyleSheet.create({
    event_content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    event_video: {
        width: '100%',
        maxHeight: '50%'
    },
    event_panel: {
        backgroundColor: ColorConfig.MAIN_WHITE,
        width: '90%',
        height: 300,
        borderRadius: 5,
        padding: 5
    },
    event_action: {
        marginTop: 10,
        borderColor: ColorConfig.MAIN_GRAY_0,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    action_handle: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5
    },
    action_handle_text: {
        color: ColorConfig.MAIN_BLUE
    },
    action_tag: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    status_panel: {
        flexDirection: 'row',
        height: 50,
        width: '100%',
        backgroundColor: ColorConfig.MAIN_WHITE,
        borderBottomWidth: 5,
        borderColor: ColorConfig.MAIN_GRAY_1
    },
    action_icon: {
        marginRight: 5,
        color: ColorConfig.MAIN_BLUE
    },
    action_text: {
        marginRight: 5,
        color: ColorConfig.MAIN_BLUE
    },
    msg_location: {
        fontSize: 28,
        color: ColorConfig.FONT_NORLMAL,
        marginTop: 10,
        marginBottom: 10
    },
    msg_date: {
        fontSize: 20,
        color: ColorConfig.FONT_NORLMAL,
        marginBottom: 5
    },
    msg_time: {
        fontSize: 20,
        color: ColorConfig.FONT_NORLMAL,
        marginBottom: 5

    }
});