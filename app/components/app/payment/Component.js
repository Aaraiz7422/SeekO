import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Purchases from 'react-native-purchases';

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
                <Text style={{ color:'black', fontSize: 30, fontWeight: "bold",fontFamily:'Poppins-Regular' }}>{`$${price}`}</Text>
            </View>
        </View>
    );
}

const SubscriptionComponent = (props) => {
    const {availablePackages} = props;

    const onSelection = async (pkg) =>{
        try {
            const {purchaserInfo, productIdentifier} = await Purchases.purchasePackage(pkg);
            if (typeof purchaserInfo.entitlements.active['pro'] !== "undefined") {
              // Unlock that great "pro" content
            }
          } catch (e) {
            if (!e.userCancelled) {
              showError(e);
            }
          }
    }

    console.log("Payment Packages : ",availablePackages);
    return (
        <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
            <View style={{ height: Dimensions.get('window').height * 0.44, justifyContent: "space-around" }}>
                {
                    availablePackages.map((pkg) => {
                        const title = pkg.product.title.split(' ');
                        return  <TouchableOpacity onPress={() => {onSelection(pkg)}}>
                        <PackageCard title={title[0]} subTitle={`(${pkg.product.description})`} price={pkg.product.price}></PackageCard></TouchableOpacity>;
                    })
                }
                 {/* <PackageCard title={} subTitle={"(Renews automatically every month)"} price={"2.99"}></PackageCard>
                <PackageCard title={"Annual Package"} subTitle={"(Renews automatically every 12 month)"} price={"34.99"}></PackageCard>  */}
            </View>
        </View>
    );
}

export default SubscriptionComponent;