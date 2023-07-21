import React, { useState, useEffect } from 'react';
import { Keyboard, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import bgImage from '../images/PhotoBG-min.png';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import {login} from '../redus/auth/authOperation'

const Login = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [inputFocusEmail, setInputFocusEmail] = useState(false);
    const [inputFocusPassword, setInputFocusPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);

    const submitForm = () => {
        const dataToSend = { email: email, password: password,};

        dispatch(login(dataToSend))
        console.log('login')
    }

    return (
        <ImageBackground source={bgImage} resizeMode="cover" style={styles.image}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.keyboardContainer}>
                    <View style={styles.formContainer}>
                        <Text style={styles.mainText}>Увійти</Text>
                        <View  style={styles.formBlock}>
                        <TextInput
                                onChangeText={(val) => setEmail(val)}
                                value={email}
                                placeholder={"Адреса електронної пошти"}
                                placeholderStyle={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: '#BDBDBD', fontWeight: 400, }}
                                style={[styles.inputBlock, inputFocusEmail && styles.focusInputBlock]}
                                onFocus={() => setInputFocusEmail(true)}
                                onBlur={() => setInputFocusEmail(false)}
                            ></TextInput>
                            <View style={styles.blockPasswod}>
                                <TextInput
                                    onChangeText={(val) => setPassword(val)}
                                    value={password}
                                    placeholder={"Пароль"}
                                    placeholderStyle={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: '#BDBDBD', fontWeight: 400, }}
                                    secureTextEntry={showPassword}
                                    style={[styles.inputBlock, inputFocusPassword && styles.focusInputBlock]}
                                    onFocus={() => setInputFocusPassword(true)}
                                    onBlur={() => setInputFocusPassword(false)}
                                ></TextInput>
                                <Text style={styles.showPassword} onPress={ () => setShowPassword(!showPassword)} >Показати</Text>
                            </View>
                            <TouchableOpacity style={styles.formButton} onPress={submitForm}>
                                    <Text style={styles.formBottomText}>Увійти</Text>
                                </TouchableOpacity>
                        </View>
                        <Text style={styles.loginText} onPress={() => navigation.navigate("Registration")}>Немає акаунту? Зареєструватися</Text>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    keyboardContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    formContainer: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems: 'center',
        paddingTop: 32,
    },
    mainText: {
        marginBottom: 33,
        color: '#212121',
        fontSize: 30,
        fontFamily: 'Roboto-Medium',
        fontWeight: 500,
    },
    formBlock: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        gap: 16,
        marginBottom: 16,
    },
    inputBlock: {
        width: '100%',
        height: 50,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        backgroundColor: '#F6F6F6',
        paddingLeft: 16,
        paddingTop: 16,
        paddingBottom: 15,
    },
    focusInputBlock: {
        borderColor: '#FF6C00',
        backgroundColor: '#FFF',
        color: '#212121',
    },
    inputBlockFocused: {
        borderColor: '#FF6C00',
        backgroundColor: '#FFF',
        color: '#212121',
    },
    formButton: {
        width: '100%',
        backgroundColor: '#FF6C00',
        paddingTop: 16,
        paddingBottom: 16,
        borderRadius: 100,
        marginTop: 27,
    },
    formBottomText: {
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        fontWeight: 400,
    },
    loginText: {
        color: '#1B4371',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        fontWeight: 400,
        marginBottom: 132,
    },
    blockPasswod: {
      width: '100%'  
    },
    blockAvatar: {
        top: -60,
        position: 'absolute',
    },
    showPassword:{
        position: 'absolute',
        top: 16,
        right: 16,
        color: '#1B4371',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        fontWeight: 400,
    },
    none: {
        display: 'none',
    }
})

export default Login