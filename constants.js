import { Dimensions } from 'react-native';
export const APP_NAME = 'SeekO'
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const MAX_CHILD_ACCOUNTS = 4;
export var global = {height: 0.0};
export const COLORS = {
    white: '#FFFFFF',
    google_red: '#DB4A39',
    facebook_blue: '#3B5998',
    secondary_background_color: '#3A4750',
    border_outline: '#EEEEEE',
};

export const input_theme = {
    roundness: 30,
    roundnessColor:"purple",
    colors:
    {
        background: "white",
        // placeholder: "black",
        // text: 'blue',
        // primary: 'white', 
        // underlineColor: 'transparent',
    }
};
export const METHOD_DATA = [
    {
        supportedMethods: ['android-pay'],
        data: {
            supportedNetworks: ['visa', 'mastercard', 'amex'],
            currencyCode: 'USD',
            environment: 'TEST', // defaults to production
            paymentMethodTokenizationParameters: {
                tokenizationType: 'NETWORK_TOKEN',
                parameters: {
                    publicKey: 'your-pubic-key',
                },
            },
        },
    },
];
export const DETAILS = {
    id: 'basic-example',
    displayItems: [
        {
            label: 'Movie Ticket',
            amount: { currency: 'USD', value: '15.00' },
        },
    ],
    total: {
        label: 'Merchant Name',
        amount: { currency: 'USD', value: '15.00' },
    },
};
