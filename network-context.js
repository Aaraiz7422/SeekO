import React, {createContext, useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

export const NetworkContext = createContext();
// export const NetworkProvider = NetworkContext.Provider;
export const NetworkProvider = (props) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // trigger whenever network state change 
    // and store network state value in isConnected variable using setIsConnected
    const removeNetInfoSubscription = NetInfo.addEventListener(
        networkState => {
    setIsConnected(networkState.isConnected);
        console.log('Connection type - ', networkState.type);
        console.log('Is connected? - ', networkState.isConnected);
      },
    );
    
    // unmounting
    return () => removeNetInfoSubscription();
  }, []);

  return (
    <NetworkContext.Provider value={{isConnected: isConnected}}>
      {props.children}
    </NetworkContext.Provider>
  );
};
