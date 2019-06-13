import React from 'react';

import { StatusBar, StyleSheet, TouchableHighlight, Animated, AppRegistry, Dimensions, Switch, View, Image, TouchableOpacity } from 'react-native';
import { Button, Text, Container, Content, Form, Item, Input, Icon, Left, Body, Right, Label, Header, Title, Spinner, Footer, FooterTab } from 'native-base';

import autobind from 'class-autobind';
import iStyle from '../../styles/webbuilding-styles';
import AlertHelper from '../../helpers/alert.helper';
import ColorConfig from '../../config/webbuilding.color.config';

export class SendMessage extends React.Component {

    constructor(props) {
        super(props);
        autobind(this);

        this.state = {

        };
    }

    render() {
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
                    <View style={styles.msg_panel}>
                        <Text style={styles.msg_title}>轉發人員</Text>
                        {this.renderMemberList()}
                        <View style={styles.button_container}>
                            <Button block info>
                                <Text>轉發</Text>
                            </Button>
                        </View>
                    </View>

                </Content>
            </Container>
        );
    }

    renderMemberList() {
        return (
            <View style={styles.member_list}>
                <TouchableOpacity style={styles.member_item}>
                    <Icon style={styles.member_item_icon_active} name="ios-checkmark-circle" />
                    <Text style={styles.member_item_text_active}>User Name A</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.member_item}>
                    <Icon style={styles.member_item_icon} name="ios-checkmark-circle-outline" />
                    <Text style={styles.member_item_text}>User Name B</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.member_item}>
                    <Icon style={styles.member_item_icon} name="ios-checkmark-circle-outline" />
                    <Text style={styles.member_item_text}>User Name B</Text>
                </TouchableOpacity>

            </View>
        );
    }

    goBack() {
        this.props.navigation.goBack();
    }
}

const styles = StyleSheet.create({
    msg_title: {
        fontSize: 24,
        color: ColorConfig.SUB_ORANGE,
        margin: 5
    },
    member_item: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    member_item_icon_active:{
        marginRight: 5,
        color:ColorConfig.SUB_ORANGE
    },
    member_item_text_active:{
        color:ColorConfig.SUB_ORANGE
    },
    member_item_icon: {
        marginRight: 5,
        color:ColorConfig.FONT_NORLMAL
    },
    member_item_text:{
        color:ColorConfig.FONT_NORLMAL
    },
    event_content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    msg_panel: {
        backgroundColor: ColorConfig.MAIN_WHITE,
        width: '90%',
        height: 800,
        borderRadius: 5,
        padding: 5
    },
    member_list: {
        padding: 5,
        borderColor: ColorConfig.MAIN_GRAY_0,
        borderTopWidth: 2,
        borderBottomWidth: 2
    },
    button_container:{
        marginTop:10
    }
});