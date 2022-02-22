import * as React from 'react';
import {
    Modal,
    Portal,
    Provider
} from 'react-native-paper';

const FullScreenModal = (props) => {

    const {visible, closeModal,children} = props;

    const containerStyle = {zIndex:2, backgroundColor: 'white', padding: 20, margin: 20,borderRadius:20};

    return(
        <Provider>
        <Portal>
            <Modal visible={visible} onDismiss={closeModal} contentContainerStyle={containerStyle}>
                {children}
            </Modal>
        </Portal>
    </Provider>
    );

}

export default FullScreenModal;
