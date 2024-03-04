import { StyleSheet, Platform } from 'react-native';

import { COLORS, SCREEN_WIDTH } from './constants';

const global = StyleSheet.create({
    regular_bold_family: {
        fontFamily: 'ProductSans-Bold',
    },
    regular_font_family: {
        fontFamily: 'ProductSans-Regular',
    },

    auth_container: {
        flex: 1,
        backgroundColor: '#F5F8FF',
    },

    auth_input: {
        fontSize: 20,
        height: 60,
        width: SCREEN_WIDTH * 0.8,
        marginTop: 20,
        // borderColor:"#399379"
    },

    anchor_text: {
        textDecorationLine: 'underline',fontFamily:'Poppins-Regular',
    },

    page_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        paddingLeft: 16,
        paddingRight: 16,
    },
    page_container_with_aligned_flex_start: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 52 + 15, //52 is height of header and 16 is padding for child components
    },
    page_container_with_aligned_flex_end: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        paddingHorizontal: 16,
        paddingBottom: 30,
    },
    row_flex_end_container: {
        marginTop:16,
        marginRight: 16,
        marginBottom: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    container_with_justify_aligned: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SCREEN_WIDTH,
        paddingHorizontal: 16,
    },
    text_input_view: {
        width: SCREEN_WIDTH * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        marginVertical: 4,fontFamily:'Poppins-Regular',
    },
    align_items_center: {
        alignItems: 'center',
    },
    margin_top_16: {
        marginTop: 16,
    },
    margin_top_10: {
        marginTop: 10,
    },
    margin_top_36: {
        marginTop: 36,
    },
    margin_bottom_16: {
        marginBottom: 16,
    },
    margin_bottom_24: {
        marginBottom: 24,
    },
    padding_bottom_24: {
        paddingBottom: 24,
    },
    vertical_margin_16: {
        marginVertical: 16,
    },
    vertical_padding_16: {
        paddingVertical: 16,
    },
    vertical_padding_8: {
        paddingVertical: 8,
    },
    header_view: {
        alignItems: 'center',
        marginBottom: 40,
    },
    horizontal_padding_22: {
        paddingHorizontal: 22,
    },
    horizontal_margin_8: {
        marginHorizontal: 8,
    },
    text: {
        textAlign: 'center',
        fontFamily:'Poppins-Regular',
    },
    button: {
        width: SCREEN_WIDTH * 0.9,
        paddingVertical: 16,
        backgroundColor: COLORS.secondary_background_color,
        borderRadius: 3,
        borderWidth: 0.5,
    },
    button_primary: {
        width: SCREEN_WIDTH * 0.9,
        paddingVertical: 16,
        borderRadius: 3,
        borderWidth: 0.5,
    },
    text_input: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Poppins-Regular',
        fontSize: 12,
        lineHeight: 14,
        color: COLORS.white,
    },
    alignTextJustify: {
        textAlign: 'justify',
    },
});

export default global;
