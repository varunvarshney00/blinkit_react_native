import { Alert, Animated, Image, Keyboard, SafeAreaView, StyleSheet, View } from 'react-native';
import React, { FC, useEffect, useRef, useState } from 'react';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import { resetAndNavigate } from '@utils/NavigationUtils';
import CustomText from '@components/ui/CustomText';
import { Colors, Fonts, lightColors } from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import Button from '@components/ui/Button';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';





const bottomColors = [...lightColors].reverse();

const CustomerLogin: FC = () => {
    const [gestureSequence, setGestureSequence] = useState<string[]>([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const keyboardOffsetHeight = useKeyboardOffsetHeight();

    const animatedValue = useRef(new Animated.Value(0)).current;






    useEffect(() => {
        if (keyboardOffsetHeight == 0) {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(animatedValue, {
                toValue: -keyboardOffsetHeight * 0.84,
                duration: 600,
                useNativeDriver: true,
            }).start();
        }
    }, [keyboardOffsetHeight]);






    const handleAuth = async () => {
        Keyboard.dismiss();
        setLoading(true);

        try {
            //   await customerLogin(phoneNumber)
            resetAndNavigate('ProductDashboard');
        } catch (error) {
            Alert.alert('Login failed');
        } finally {
            setLoading(false);
        }
    };





    const handleGesture = ({ nativeEvent }: any) => {
        if (nativeEvent.state === State.END) {
            const { translationX, translationY } = nativeEvent;
            let direction = '';
            if (Math.abs(translationX) > Math.abs(translationY)) {
                direction = translationX > 0 ? 'right' : 'left';
            } else {
                direction = translationY > 0 ? 'down' : 'up';
            }

            console.log(translationX, translationY, direction);

            const newSequence = [...gestureSequence, direction].slice(-5);
            setGestureSequence(newSequence);

            if (newSequence.join(' ') === 'up up down left right') {
                setGestureSequence([]);
                resetAndNavigate('DeliveryLogin');
            }
        }
    };






    return (
        <GestureHandlerRootView style={styles.container}>
            <CustomSafeAreaView>
                <ProductSlider />
                <PanGestureHandler
                    // onGestureEvent={handleGesture}
                    onHandlerStateChange={handleGesture}
                >


                    <Animated.ScrollView
                        bounces={false}
                        keyboardDismissMode="on-drag"
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={styles.subContainer}
                        style={{ transform: [{ translateY: animatedValue }] }}
                    >


                        <LinearGradient
                            colors={bottomColors}
                            style={styles.gradient}
                        />


                        <View style={styles.content}>
                            <Image
                                source={require('@assets/images/logo.png')}
                                style={styles.logo}
                            />





                            <CustomText
                                variant="h2"
                                fontFamily={Fonts.Bold}
                            >
                                India's last minute app
                            </CustomText>



                            <CustomText
                                variant="h5"
                                fontFamily={Fonts.SemiBold}
                                style={styles.text}
                            >
                                Login or Signup
                            </CustomText>





                            <CustomInput
                                inputMode="numeric"
                                left={
                                    <CustomText
                                        variant="h6"
                                        fontFamily={Fonts.SemiBold}
                                        style={styles.phoneText}
                                    >
                                        +91
                                    </CustomText>
                                }
                                value={phoneNumber}
                                onClear={() => setPhoneNumber('')}
                                onChangeText={(text) => {
                                    setPhoneNumber(text.slice(0, 10));
                                }}
                            />





                            <Button
                                loading={loading}
                                onPress={handleAuth}
                                disabled={phoneNumber?.length !== 10}
                                title="continue"
                            />





                        </View>
                    </Animated.ScrollView>


                </PanGestureHandler>
            </CustomSafeAreaView>

            <View style={styles.footer}>
                <SafeAreaView>
                    <CustomText fontSize={RFValue(6)}>By Continuing, you agree to our T&C</CustomText>
                </SafeAreaView>
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        marginTop: 2,
        marginBottom: 25,
        opacity: 0.8,
    },
    phoneText: {
        marginLeft: 10,
    },
    subContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
    },
    footer: {
        borderTopWidth: 0.8,
        borderColor: Colors.border,
        paddingBottom: 10,
        zIndex: 22,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f8f9fc',
        width: '100%',
    },
    gradient: {
        paddingTop: 60,
        width: '100%',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    logo: {
        height: 50,
        width: 50,
        borderRadius: 20,
        marginVertical: 10,
    },
});

export default CustomerLogin;
