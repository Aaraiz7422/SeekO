import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

const PackageCard = ({ title, subTitle, price }) => {
    return (
        <View style={{
            height: Dimensions.get('window').height * 0.18,
            width: Dimensions.get('window').width * 0.76,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
            marginHorizontal: 20,
            padding: 16,
            borderRadius: 20,
            elevation: 4,
        }}>
            <View style={{
                // backgroundColor: "orange",
                width: Dimensions.get('window').width * 0.45
            }}>
                <Text style={{ color:'black', fontSize: 22, fontWeight: "bold", fontFamily:'Poppins-Regular' }}>{title}</Text>
                <Text style={{ color:'black', fontSize: 18, fontFamily:'Poppins-Regular' }}>{subTitle}</Text>
            </View>
            <View
            // style={{backgroundColor:"green"}}
            >
                <Text style={{ color:'black', fontSize: 30, fontWeight: "bold",fontFamily:'Poppins-Regular' }}>$2.99</Text>
            </View>
        </View>
    );
}

const SubscriptionComponent = () => {
    return (
        <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
            <View style={{ height: Dimensions.get('window').height * 0.44, justifyContent: "space-around" }}>
                 <PackageCard title={"Monthly"} subTitle={"(Renews automatically every month)"} price={"$2.99"}></PackageCard>
                <PackageCard title={"Annual Package"} subTitle={"(Renews automatically every 12 month)"} price={"$33"}></PackageCard> 
            </View>
        </View>
    );
}

export default SubscriptionComponent;