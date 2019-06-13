import React from 'react';

import { StatusBar, Platform, StyleSheet, TouchableHighlight, Animated, AppRegistry, Dimensions, Switch, View, Image, TouchableOpacity, PushNotificationIOS, Vibration, AppState } from 'react-native';
import { Button, Text, Container, Content, Header, Form, Item, Input, Icon, Left, Body, Right, Label, Title, Spinner, Footer, FooterTab } from 'native-base';

import autobind from 'class-autobind';
import iStyle from '../../styles/webbuilding-styles';
import AlertHelper from '../../helpers/alert.helper';
import ColorConfig from '../../config/webbuilding.color.config';
import { AlarmType } from '../../domain/core';
import EventService from '../../service/event.service';
import MessageService from '../../service/message.service';
import MomentHelper from "../../helpers/moment.helper";
import moment from 'moment';
import APIService from '../../service/api.service';
// import { MessageView } from '../shared/message-view';

export class EventList extends React.Component {

    constructor(props) {
        super(props);
        autobind(this);

        var { height, width } = Dimensions.get('window');

        var itemWithValue = (width / 3);

        this.state = {
            eventList: [],//EventService.getEventList().event_list,
            eventTmpList: [],
            isList: false,
            alarmType: AlarmType.CLUSTERING,
            itemWith: itemWithValue,
            viewRefs: {},
            itemVisibleSize: 12,
            currentPage: 1,
            totalEvents: 1,
            loading: false,
            timerActive: true
        };

        MessageService.initPushNotification();
        // this._onNativeCallback = this._onNativeCallback.bind(this);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.handleNotification = this.handleNotification.bind(this);

        this.getAbEventList();

        this.eventListTimer()
    }

    componentWillMount() {

        PushNotificationIOS.addEventListener('notification', this.handleNotification);

        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {

        PushNotificationIOS.removeEventListener('notification', this.handleNotification);

        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange = (nextAppState) => {
        // When App go into the background mode, App will save the events to loacl storage.
        if (!nextAppState.match(/inactive|background/)) {

            Vibration.vibrate();

            this.reloadEvent();

            PushNotificationIOS.removeAllDeliveredNotifications();
            PushNotificationIOS.setApplicationIconBadgeNumber(0);

        }
    }

    handleNotification = (notification) => {

        console.log('=== Trigger Notification Handler ===');

        // AlertHelper.alertError('=== Trigger Notification Handler ===');

        if (!AppState.currentState.match(/inactive|background/)) {

            if (!notification) {
                return;
            }

            Vibration.vibrate();
            this.reloadEvent();

        }
    }

    isLoading(flag) {
        this.setState({
            loading: flag
        });
    }

    eventListTimer() {
        setInterval(() => {

            if (this.state.isLoading) {
                return;
            }

            if (!this.state.timerActive) {
                return;
            }

            console.log('CheckServer');
            this.checkEvent();

        }, 15000);
    }

    // eventListTimerHandler

    /** 取得異常列表 */
    getAbEventList() {

        this.isLoading(true);

        APIService.getEventList({
            startDate: +MomentHelper.getDate(+moment()).add("Day", -7),
            endDate: +moment(),
            page: this.state.currentPage
                ? this.state.currentPage
                : 1,
            pageSize: this.state.itemVisibleSize
                ? this.state.itemVisibleSize
                : 12,
            eventtype: this.state.alarmType
        })
            .switchMap(res => res.json())
            .map(event => {
                console.log('App Console : ', event.results);

                this.setState({
                    totalEvents: event.total,
                    currentPage: event.page,
                    eventTmpList: event.results,

                }, () => {
                    console.log('App Console Event List: ', this.state.eventTmpList);
                    this.setState({
                        eventList: this.state.eventList.concat(this.state.eventTmpList)
                    })

                    this.isLoading(false);
                });
            })
            .toPromise()
            .catch(error => {
                console.log('App Console : ERROR', error);
                AlertHelper.displayToast("加载时发生错误")
                this.isLoading(false);
            });
    }

    // componentDidMount() {
    //     // this.setState({
    //     //     eventList: EventService.getEventList().event_list
    //     // })

    //     console.log('eventList', this.state.eventList);
    // }

    render() {
        return (
            <Container style={iStyle.baseContainer}>
                <Header style={iStyle.header}>
                    <Left>

                    </Left>
                    <Body>
                        <Title style={{ color: ColorConfig.MAIN_WHITE, fontSize: 24 }}>EVIS</Title>
                    </Body>
                    <Right>
                        <TouchableOpacity style={{ width: 40 }} onPress={() => {
                            this.setListView(false);
                        }}>
                            <Icon style={this.state.isList ? styles.list_mode : styles.list_mode_active} name="ios-apps" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 40 }} onPress={() => {
                            this.setListView(true);
                        }}>
                            <Icon style={this.state.isList ? styles.list_mode_active : styles.list_mode} name="ios-list-box" />
                        </TouchableOpacity>
                    </Right>
                </Header>
                {this.renderFilter()}
                <Content padder
                    style={iStyle.baseContent}
                    scrollEnabled={true}>
                    {/* {this.state.eventList && this.renderList()} */}
                    {this.state.isList ? this.renderList() : this.renderMap()}

                    {this.state.loading ?
                        <Spinner color={ColorConfig.SUB_ORANGE} /> :
                        <TouchableOpacity style={styles.btn_loading} onPress={() => {
                            this.loadEvent()
                        }}>
                            <Text style={styles.btn_loading_text}>载入</Text>
                        </TouchableOpacity>}
                </Content>
                <Footer style={styles.footer}>
                    <View style={styles.footer_item}>
                        <Button style={styles.footer_btn} onPress={() => {
                            this.goHome();
                        }}>
                            <Icon name='ios-home' />
                        </Button>
                    </View>
                    {/* <View style={styles.footer_item}>
                        <Button style={styles.footer_btn}>
                            <Icon name='ios-bookmark' />
                        </Button>
                    </View> */}
                    <View style={styles.footer_item}>
                        <Button style={styles.footer_btn} onPress={() => { this.goUserInfo() }}>
                            <Icon name='ios-person' />
                        </Button>
                    </View>
                    {/* <MessageView
                        ref={(ref) => {
                            this.state.viewRefs['message'] = ref;
                        }}
                        onNativeCallback={this._onNativeCallback}>
                    </MessageView> */}
                </Footer>
            </Container>
        );
    }

    renderFilter() {
        return (
            <View style={styles.filterBar}>
                <TouchableOpacity style={this.style_AlarmActiveBar(AlarmType.CLUSTERING)} onPress={() => { this.selectAlarmType(AlarmType.CLUSTERING) }}>
                    <Text style={this.style_AlarmActiveText(AlarmType.CLUSTERING)}>群聚</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.style_AlarmActiveBar(AlarmType.BREAK_IN)} onPress={() => { this.selectAlarmType(AlarmType.BREAK_IN) }}>
                    <Text style={this.style_AlarmActiveText(AlarmType.BREAK_IN)}>闯入</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.style_AlarmActiveBar(AlarmType.ALARM)} onPress={() => { this.selectAlarmType(AlarmType.ALARM) }}>
                    <Text style={this.style_AlarmActiveText(AlarmType.ALARM)}>警报</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.style_AlarmActiveBar(AlarmType.FTS)} onPress={() => { this.selectAlarmType(AlarmType.FTS) }}>
                    <Text style={this.style_AlarmActiveText(AlarmType.FTS)}>追踪</Text>
                </TouchableOpacity>
            </View>
        );
    }

    /** 格狀顯示 */
    renderMap() {


        if (!this.state.eventList || !Array.isArray(this.state.eventList) || this.state.eventList.length <= 0) {
            return (
                <View>
                    <Text>没有资料</Text>
                </View>
            )
        }

        console.log('Start Map Render', this.state.eventList.length);

        items = [];
        itemRow = [];
        conter = 1;

        this.state.eventList.forEach(item => {
            console.log('App Console Event: ', `${APIService.serverUrl}${item.imgUrl}`);

         
            let imgUrl = `${APIService.serverUrl}${item.imgUrl}`

            if(this.state.alarmType == AlarmType.FTS){
                imgUrl = item.imgUrl;
            }

            items.push(
                <View style={styles.video_item}>
                    <TouchableOpacity key={item.id} style={styles.img_container} onPress={() => { this.goDetail(item) }}>

                        <Image style={styles.map_screenshot} source={{ uri: imgUrl }} />

                    </TouchableOpacity>
                </View>
            )

            if ((conter % 3 == 0) || (conter == this.state.eventList.length)) {
                itemRow.push(
                    <View key={conter} >
                        <View style={styles.video_row}>
                            {items}
                        </View>
                    </View>
                );
                items = [];
            }
            conter++;
        });

        return itemRow;

    }

    /** 列表顯示 */
    renderList() {

        console.log('Active Render');

        if (!this.state.eventList || !Array.isArray(this.state.eventList) || this.state.eventList.length <= 0) {
            return (
                <View>
                    <Text>没有资料</Text>: <Text></Text>
                </View>
            )
        }

        console.log('Start Render', this.state.eventList);

        const items = [] = this.state.eventList.map(item => {

            const companyName = item.company ? item.company.name ? item.company.name : '':'';

            let imgUrl = `${APIService.serverUrl}${item.imgUrl}`

            if(this.state.alarmType == AlarmType.FTS){
                imgUrl = item.imgUrl;
            }

            return (<View key={item.id} style={styles.item_box}>
                <TouchableOpacity style={styles.listItem} onPress={() => { this.goDetail(item) }}>
                    <View style={styles.listItem_header}>
                        <View style={styles.img_container}>
                            <Image style={styles.map_screenshot} source={{ uri: imgUrl }} />
                            {/* <Image style={styles.map_screenshot} source={require('../../assets/img/testBG.jpg')} /> */}
                        </View>
                    </View>
                    <View style={styles.listItem_body}>
                        <Text numberOfLines={1} ellipsizeMode={Platform.OS === 'android' ? 'tail' : 'clip'} style={styles.event_name}>{companyName}</Text>
                        <Text numberOfLines={1} ellipsizeMode={Platform.OS === 'android' ? 'tail' : 'clip'} style={styles.event_date}>{moment(item.timecode).format('YYYY/MM/DD')}</Text>
                        <Text numberOfLines={1} ellipsizeMode={Platform.OS === 'android' ? 'tail' : 'clip'} style={styles.event_time}> {moment(item.timecode).format('HH:mm:ss')}</Text>
                    </View>
                    <View style={styles.listItem_footer}>
                        <Icon style={styles.event_unRead} name='ios-paper' />
                    </View>
                </TouchableOpacity>
            </View>)
        });

        return items;
    }

    selectAlarmType(selectedType) {
        this.setState({
            eventList: [],
            alarmType: selectedType,
            currentPage: 1
        }, () => {
            this.getAbEventList();
        });
    }

    loadEvent() {
        console.log('loadEvent');
        /** 檢查是否有新的資料 */
        APIService.getEventList({
            startDate: +MomentHelper.getDate(+moment()).add("Day", -7),
            endDate: +moment(),
            page: 1,
            pageSize: 1,
            eventtype: this.state.alarmType
        })
            .switchMap(res => res.json())
            .map(result => {
                console.log('count', result.total);

                if (result.total > this.state.totalEvents) {
                    this.reloadEvent();
                    return;
                }

                // AlertHelper.displayToast('已加载完毕');
                if (this.state.eventList.length >= this.state.totalEvents) {
                    AlertHelper.displayToast('已加载完毕');
                    return;
                }

                this.setState({
                    currentPage: this.state.currentPage + 1
                }, () => {
                    this.getAbEventList();
                });
            }).toPromise();

    }

    checkEvent() {
        console.log('loadEvent');
        /** 檢查是否有新的資料 */
        APIService.getEventList({
            startDate: +MomentHelper.getDate(+moment()).add("Day", -7),
            endDate: +moment(),
            page: 1,
            pageSize: 1,
            eventtype: this.state.alarmType
        })
            .switchMap(res => res.json())
            .map(result => {
                console.log('count', result.total);

                if (result.total > this.state.totalEvents) {
                    this.reloadEvent();
                    return;
                }
            }).toPromise();

    }

    reloadEvent() {
        this.setState({
            eventList: []
        }, () => {
            for (var i = 1; i <= this.state.currentPage; i++) {
                this.setState({
                    currentPage: i
                }, () => {
                    this.getAbEventList();
                });
            }
        });

    }

    style_AlarmActiveBar(selectedType) {
        var style = styles.tagBar;

        if (this.state.alarmType == selectedType) {
            return styles.tagBar_active;
        }

        return style;
    }

    style_AlarmActiveText(selectedType) {

        var style = styles.tagBarText;

        if (this.state.alarmType == selectedType) {
            return styles.tagBarText_active;
        }

        return style;
    }

    setListView(flag) {
        this.setState({
            isList: flag
        });
    }

    activeTimer() {
        this.setState({
            timerActive: true
        })
    }

    goDetail(detail) {
        this.setState({
            timerActive: false
        }, () => {
            this.props.navigation.navigate('eventDetail', { eventDetail: detail, onActiveTimer: this.activeTimer,alarmType:this.state.alarmType });
        })
    }

    goUserInfo() {
        this.setState({
            timerActive: false
        }, () => {
            this.props.navigation.navigate('userInfo', { onActiveTimer: this.activeTimer });
        })
    }

    goHome() {
        this.setState({
            timerActive: false
        }, () => {
            this.props.navigation.replace('login');
        })
    }

    checkIsLogin() {

    }
}

const styles = StyleSheet.create({
    btn_loading: {
        flex: 1,
        backgroundColor: ColorConfig.SUB_ORANGE,
        margin: 5,
        padding: 5,
        borderRadius: 5
    },
    btn_loading_text: {
        color: ColorConfig.MAIN_WHITE,
        textAlign: 'center',
        fontSize: 24
    },
    video_row: {
        position: 'relative',
        // flex: 1,
        // flexWrap: 'wrap',
        flexDirection: 'row',
        height: 110,
        overflow: 'hidden'
    },
    video_item: {
        // flex: 1,
        // position:'absolute',
        position: 'relative',
        width: ((Dimensions.get('window').width / 3) - 18),
        height: 100,
        maxHeight: 100,
        backgroundColor: ColorConfig.MAIN_WHITE,
        margin: 5
    },
    filterBar: {
        backgroundColor: ColorConfig.MAIN_WHITE,
        height: 45,
        width: '100%',
        flexDirection: 'row',
    },
    list_mode_active: {
        color: ColorConfig.SUB_ORANGE,
        fontSize: 28
    },
    list_mode: {
        color: ColorConfig.MAIN_WHITE,
        fontSize: 28
    },
    footer: {
        padding: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: ColorConfig.MAIN_GRAY_1
    },
    footer_item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: ColorConfig.MAIN_GRAY_1
    },
    footer_btn: {
        backgroundColor: ColorConfig.SUB_ORANGE,

        justifyContent: 'center',
        alignItems: 'center',
    },
    tagBar_active: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: ColorConfig.SUB_ORANGE,
        borderBottomWidth: 2,
    },
    tagBar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: ColorConfig.MAIN_GRAY_2,
        borderBottomWidth: 2,
    },
    tagBarText_active: {
        color: ColorConfig.SUB_ORANGE,
    },
    tagBarText: {
        color: ColorConfig.MAIN_GRAY_2
    },
    listItem: {
        backgroundColor: ColorConfig.MAIN_WHITE,
        borderWidth: 1,
        borderColor: ColorConfig.MAIN_GRAY_1,
        width: '100%',
        height: 100,
        marginBottom: 10,
        flex: 1,
        borderRadius: 3,
        flexDirection: 'row',
        padding: 5
    },
    listItem_header: {
        height: '100%',
        width: 90,
        backgroundColor: ColorConfig.MAIN_GRAY_0,
    },
    listItem_body: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        padding: 5
    },
    listItem_footer: {
        height: '100%',
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    event_read: {
        color: ColorConfig.MAIN_GRAY_0,
    },
    event_unRead: {
        color: ColorConfig.FONT_NORLMAL,
    },
    event_name: {
        fontSize: 24,
        lineHeight: 24,
        // height:32,
        color: ColorConfig.FONT_NORLMAL,
        width: '100%',
        flexShrink: 0,
        marginBottom: 10
    },
    event_date: {
        fontSize: 16,
        lineHeight: 16,
        color: ColorConfig.FONT_DEEP,
        width: '100%',
        flexShrink: 0,
        marginBottom: 5
    },
    event_time: {
        fontSize: 14,
        lineHeight: 14,
        color: ColorConfig.FONT_NORLMAL,
        width: '100%',
        flexShrink: 0,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    result_item_detail_container: {
        marginLeft: 15,
        width: 50,
        height: 100,
        justifyContent: 'flex-end',
    },
    result_item_detail_icon: {
        width: '100%',
        resizeMode: 'contain'
    },
    img_container: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: 100,

    },
    map_screenshot: {
        width: '100%',
        resizeMode: 'contain',
        // width:100,
        height: 100,
        // backgroundColor: '#000'
    }
});