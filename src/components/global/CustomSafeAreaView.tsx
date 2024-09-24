import { SafeAreaView, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { FC, ReactNode } from 'react'

interface CustomSafeAreaViewProps {
    children: ReactNode,
    style?: ViewStyle
}

const CustomSafeAreaView: FC<CustomSafeAreaViewProps> = ({ children, style }) => {
    return (
        <SafeAreaView style={[styles.container, style]}>
            <View style={[styles.container, style]}>{children}</View>
        </SafeAreaView>
    )
}

export default CustomSafeAreaView

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
    }
})