
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import {
    Button,
    Container,
    Content,
    Item,
    Input,
    Label,
    Spinner,
    Footer
} from 'native-base';

import autobind from 'class-autobind';
import ColorConfig from '../config/webbuilding.color.config';
import iStyle from '../styles/webbuilding-styles';
import StorageHelper from '../helpers/storage.helper';
import { StorageKeys } from '../domain/storage';
import Validation from '../helpers/validation.helper';

import UserService from '../service/user.service';
import APIService from '../service/api.service';
import AlertHelper from '../helpers/alert.helper'

export class Login extends React.Component {

    componentDidMount() {
        this.getLocalStorage();
    }

    constructor(props) {
        super(props);
        autobind(this);

        this.state = {
            account: 'Admin',
            password: '123456',
            host: '172.16.10.253',
            port: '6060'
        }
    }

    render() {
        return (
            <Container style={iStyle.baseContainer}>
                <Content style={styles.login_content} contentContainerStyle={styles.login_container}>

                    <View removeClippedSubviews={false} style={styles.login_panel}>
                        <View style={styles.login_title}>
                            <View style={iStyle.logo}>
                                {/* <Image style={iStyle.img} source={require('../assets/img/logo.jpg')} /> */}
                            </View>
                            <Text style={styles.login_subTitle} >EVIS</Text>
                        </View>
                        <View style={styles.login_body}>
                            <View style={iStyle.form_group}>
                                <Item floatingLabel style={iStyle.no_border}>
                                    <Label>Host</Label>
                                    <Input
                                        returnKeyType="next"
                                        style={iStyle.form_control}
                                        autoCapitalize='none'
                                        onChangeText={(host) => this.setState({ host })}
                                        value={this.state.host} />
                                </Item>
                                <Item floatingLabel style={iStyle.no_border}>
                                    <Label>Port</Label>
                                    <Input
                                        returnKeyType="next"
                                        style={iStyle.form_control}
                                        autoCapitalize='none'
                                        onChangeText={(port) => this.setState({ port })}
                                        value={this.state.port} />
                                </Item>
                            </View>
                            <View style={iStyle.form_group}>
                                <Item floatingLabel style={iStyle.no_border}>
                                    <Label>Account</Label>
                                    <Input
                                        returnKeyType="next"
                                        autoCapitalize='none'
                                        style={iStyle.form_control}
                                        onChangeText={(account) => this.setState({ account })}
                                        value={this.state.account} />
                                </Item>
                                <Item floatingLabel style={iStyle.no_border}>
                                    <Label>Password</Label>
                                    <Input
                                        returnKeyType="next"
                                        style={iStyle.form_control}
                                        autoCapitalize='none'
                                        onChangeText={(password) => this.setState({ password })}
                                        value={this.state.password}
                                        secureTextEntry={true} />
                                </Item>
                            </View>
                            <Item regular style={iStyle.no_border}>
                                <Button style={iStyle.btn_primary} onPress={() => {
                                    this.login();
                                }}>
                                    <Text style={iStyle.btn_Text}>Log In</Text>
                                </Button>
                            </Item>
                        </View>
                    </View>
                </Content>
                <Footer style={styles.footer}>
                    <Text style={{ color: ColorConfig.MAIN_GRAY_3,fontSize:18 }}>powered by iSap</Text>
                </Footer>
            </Container>
        );
    }

    getLocalStorage() {
        StorageHelper.getStorage(StorageKeys.login)
          .then(config => {
            this.setState({
              host: config.host,
              port: config.port,
              account: config.account
            });
          })
          .catch((error) => {
            console.log(error.message);
            return;
          });
    }

    saveLocalStorage() {
        StorageHelper.setStorage(StorageKeys.login, {
          host: this.state.host,
          port: this.state.port,
          account: this.state.account,
          password: this.state.password
        }).catch((error) => {
          AlertHelper.alertError('Save Config Failed.');
          return;
        });
    }

    login() {

        if (!Validation.ValidHost(this.state.host) || !Validation.ValidPort(this.state.port)) {
            AlertHelper.alertError('Please check your server settings.');
            return;
        }

        if (!Validation.ValidValue(this.state.account) || !Validation.ValidValue(this.state.password)) {
            AlertHelper.alertError('Please check your account and password.');
            return;
        }

        this.saveLocalStorage();


        APIService.host =  this.state.host;
        APIService.port =  this.state.port;

        this.nextPage();
        
        UserService.login({
            account: this.state.account,
            password: this.state.password
        })
            .do((res) => {
                console.log('LoginAccess AppConsole : ' + JSON.stringify(res));

                UserService.username = this.state.account;
                UserService.password = this.state.password;

                if (res) {
                    this.nextPage();
                    return;
                }

                AlertHelper.alertError('帐号或密码错误.');
            })
            .toPromise()
            .catch((error) => {
                console.log('AuthErroe AppConsole ' + JSON.stringify(error));
                AlertHelper.alertError('请检查网路连线.');
            });

    }

    nextPage() {

        this.props.navigation.navigate('eventList');
    }

}

const styles = StyleSheet.create({
    login_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 30
    },
    login_content: {
        height: 150,
        borderRadius: 5,
        flex: 1,
    },
    login_panel: {
        backgroundColor: ColorConfig.MAIN_WHITE,
        maxWidth: 400,
        width: '80%',
        height: 460,
        borderRadius: 5,
    },
    login_title: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorConfig.MAIN_WHITE,
        height: 80,
        borderColor: ColorConfig.MAIN_GRAY_0,
        borderBottomWidth: 1,
        borderRadius: 5,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
    login_subTitle:{
        textAlign:'center',
        color: ColorConfig.SUB_ORANGE,
        fontSize: 25,
        marginBottom:8
    },
    login_body: {
        margin: 15,
        marginTop:0
    },
    footer:{
        width:'100%',
        backgroundColor: ColorConfig.MAIN_GRAY_1,
        borderTopWidth:0,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
