import React, {createContext, useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

export const NetworkContext = createContext();
// export const NetworkProvider = NetworkContext.Provider;
export const NetworkProvider = (props) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(
        networkState => {
    setIsConnected(networkState.isConnected);
        console.log('Connection type - ', networkState.type);
        console.log('Is connected? - ', networkState.isConnected);
      },
    );
    // console.log(`isConnected : ${isConnected}`);
    return () => removeNetInfoSubscription();
  }, []);

  const handleConnectivityChange = isConnected => {
    setIsConnected(isConnected);
    console.log(`isConnected : ${isConnected}`);
  };

  return (
    <NetworkContext.Provider value={{isConnected: isConnected}}>
      {props.children}
    </NetworkContext.Provider>
  );
};
