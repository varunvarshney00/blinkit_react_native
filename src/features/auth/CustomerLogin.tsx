import { Animated, Image, StyleSheet, View } from 'react-native';
import React, { FC, useState } from 'react';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import { resetAndNavigate } from '@utils/NavigationUtils';


const CustomerLogin: FC = () => {
    const [gestureSequence, setGestureSequence] = useState<string[]>([]);





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
            <View style={styles.container}>
                <CustomSafeAreaView>
                    <ProductSlider />
                    <PanGestureHandler onHandlerStateChange={handleGesture}>
                        <Animated.ScrollView
                            bounces={false}
                            keyboardDismissMode="on-drag"
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={styles.subContainer}
                        // style={{ transform: [{ translateY: animatedValue }] }}
                        >

                            <View style={styles.content}>
                                <Image
                                    source={require("@assets/images/logo.png")}
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
                                    onClear={() => setPhoneNumber("")}
                                    onChangeText={(text) => {
                                        setPhoneNumber(text.slice(0, 10))
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

            </View>
        </GestureHandlerRootView>
    );
};

export default CustomerLogin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
    },
    content: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingBottom: 20,
      },
      logo: {
        height: 50,
        width: 50,
        borderRadius: 20,
        marginVertical: 10,
      },
      text: {
        marginTop: 2,
        marginBottom: 25,
        opacity: 0.8,
      },
});
