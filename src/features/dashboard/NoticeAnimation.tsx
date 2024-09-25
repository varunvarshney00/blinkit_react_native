import { View, Text, StyleSheet, Animated as RNAnimated } from 'react-native';
import React, { FC } from 'react';

const NoticeAnimation: FC<{ noticePosition: any; children: React.ReactElement }> = ({ noticePosition, children }) => {
    return (
        <View>
            {children}
        </View>
    );
};

export default NoticeAnimation;


const styles = StyleSheet.create({
    noticeContainer: {
        width: '100%',
        zIndex: 999,
        position: 'absolute',
    },
    contentContainer: {
        flex: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});


