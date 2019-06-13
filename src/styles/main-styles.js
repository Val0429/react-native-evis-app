import {
    StyleSheet
} from 'react-native';
import ColorConfig from '../config/color.config';

const iStyle = StyleSheet.create({
    baseContainer: {
        backgroundColor: ColorConfig.MAIN_CICOLOR,
    },
    baseContent: {
        flex: 1,
        padding: 2,
        backgroundColor: ColorConfig.MAIN_CICOLOR_BG
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: ColorConfig.MAIN_BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 30,

    },
    logo: {
        flex:1,
        justifyContent: 'center',
        width: '65%',
    },
    img: {
        width: '100%',
        resizeMode: 'contain'
    },
    header: {
        backgroundColor: ColorConfig.MAIN_CICOLOR_DEEP,
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        flexDirection: 'row',
    },
    header_icon_container: {
        width: 40,
        height: 40,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header_icon: {
        width: '100%',
        resizeMode: 'contain'
    },
    header_title: {
        color: ColorConfig.MAIN_MUDIUM,
        fontSize: 24,
    },
    header_menu: {
        position: 'absolute',
        top: 18,
        right: 15,
        backgroundColor: ColorConfig.TRANSPARENT,
        borderColor: ColorConfig.TRANSPARENT,
        width: 30,
        height: 30
    },
    header_menu_img: {
        width: '100%',
        resizeMode: 'contain'
    },
    sideBar: {
        position: "absolute",
        right: 0,
        width: '80%',
        backgroundColor: ColorConfig.MAIN_MASK,
        height: '100%',
        borderColor: ColorConfig.MAIN_FONT_BLACK,
        borderLeftWidth: 1
    },
    sideBar_menu: {
        alignSelf: 'flex-end',
        right: 15,
        marginTop: 18,
        backgroundColor: ColorConfig.TRANSPARENT,
        borderColor: ColorConfig.TRANSPARENT,
        width: 30,
        height: 30,
        marginBottom: 20
    },
    sideBar_menu_img: {
        width: '100%',
        resizeMode: 'contain'
    },

    sideBar_menu_item: {
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        flex: 1,
        flexDirection: 'row',
        padding: 15,
        paddingLeft: 30
    },
    sideBar_menu_item_icon_container: {
        width: 30,
        height: 30,
        marginRight: 20

    },
    sideBar_menu_item_icon: {
        width: '100%',
        resizeMode: 'contain',
    },
    sideBar_menu_item_text: {
        color: ColorConfig.WHITE,
        fontSize: 22
    },
    footer: {
        backgroundColor: ColorConfig.MAIN_BACKGROUND,
        padding: 15,
        height: 75,
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer_menu: {
        flex: 1,
        top: 0,
        backgroundColor: ColorConfig.MAIN_MASK,
        borderColor: ColorConfig.TRANSPARENT,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer_shoot: {
        backgroundColor: ColorConfig.MAIN_MASK,
        flex: 1,
        top: 0,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

    },
    footer_menu_img: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        justifyContent: 'flex-end',
    },
    form_group: {
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        width: '100%',
        marginBottom: 15
    },
    form_control: {
        backgroundColor: ColorConfig.TRANSPARENT,
        color: ColorConfig.MAIN_FONT,
        fontSize: 24,
        borderBottomWidth: 2,
        borderColor: ColorConfig.MAIN_LIGHT,
        borderRadius: 5,
        marginBottom: 10,
        textAlign: 'center',
    },
    form_control_b_n: {
        backgroundColor: ColorConfig.MAIN_BACKGROUND,
        color: ColorConfig.MAIN_FONT,
        fontSize: 24,
        borderWidth: 0,
        borderColor: ColorConfig.MAIN_LIGHT,
        borderRadius: 5,
        marginBottom: 10,
        textAlign: 'center',
    },
    btn_primary: {
        backgroundColor: ColorConfig.MAIN_CICOLOR,
        borderColor: ColorConfig.MAIN_CICOLOR,
        borderWidth: 1,
        marginRight: 10,
        paddingLeft: 15,
        paddingRight: 15
    },

    btn_deep: {
        backgroundColor: ColorConfig.MAIN_DEEP,
        borderColor: ColorConfig.MAIN_DEEP,
        borderWidth: 1,
        marginRight: 10,
        paddingLeft: 15,
        paddingRight: 15,
        
    },
    btn_Text: {
        color:ColorConfig.WHITE,
        fontSize:18,
        
    },
    no_border: {
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },

    container: {
        backgroundColor: ColorConfig.MAIN_BACKGROUND
    },
    hr: {
        width: '100%',
        height: 2,
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: ColorConfig.MAIN_GRAY
    }
});



export default iStyle;