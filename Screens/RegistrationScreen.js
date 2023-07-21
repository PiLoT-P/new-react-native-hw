import React, { useState, useEffect } from 'react';
import { Keyboard, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import bgImage from '../images/PhotoBG-min.png';
import Icon from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import {register} from '../redus/auth/authOperation'

const Registration = () => {
    const dispatch = useDispatch()

    const [inputFocusEmail, setInputFocusEmail] = useState(false);
    const [inputFocusPassword, setInputFocusPassword] = useState(false);
    const [inputFocusLogin, setInputFocusLogin] = useState(false);

    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
        setImage(result.assets[0].uri);
        }
    };

    const submitForm = () => {
        const dataToSend = { avatar: image, name: login, email: email, password: password };

        dispatch(register(dataToSend));
        console.log('register')
    }

     const navigation = useNavigation();

    return (
        <ImageBackground source={bgImage} resizeMode="cover" style={styles.image}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.keyboardContainer}>
                    <View style={styles.formContainer}>
                        <View style={styles.blockAvatar}>
                            {image && <Image source={{ uri: image }} style={styles.avatar} />}
                            {image ? <Icon style={styles.addIcon} name="closecircle" size={25} color={'#BDBDBD'} onPress={() => setImage(null)} /> :
                                <Icon style={styles.addIcon} name="pluscircleo" size={25} color={'#FF6C00'} onPress={pickImage} />}
                        </View>
                        <Text style={styles.mainText}>Реєстрація</Text>
                        <View  style={styles.formBlock}>
                            <TextInput
                                onChangeText={(val) => setLogin(val)}
                                value={login}
                                placeholder={"Логін"}
                                placeholderStyle={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: '#BDBDBD', fontWeight: 400, }}
                                style={[styles.inputBlock, inputFocusLogin && styles.focusInputBlock]}
                                onFocus={() => setInputFocusLogin(true)}
                                onBlur={() => setInputFocusLogin(false)}
                            ></TextInput>
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
                                <Text style={styles.showPassword} onPress={(val)=>setShowPassword(!showPassword)}>Показати</Text>
                            </View>
                            <TouchableOpacity style={styles.formButton} onPress={submitForm}>
                                <Text style={styles.formBottomText}>Зареєстуватися</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.loginText} onPress={() => navigation.navigate("Login")}>Вже є акаунт? Увійти</Text>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </ImageBackground>
    )
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
    text: {
        color: 'white',
        fontSize: 42,
        lineHeight: 84,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000c0',
    },
    formContainer: {
        // height: 549,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems: 'center',
        paddingTop: 92,
    },
    mainText: {
        marginBottom: 33,
        color: '#212121',
        fontSize: 30,
        fontFamily: 'Roboto-Medium',
        // fontStyle: 'normal',
        fontWeight: 500,
        // lineHeight: 'normal',
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
        marginBottom: 66,
    },
    blockPasswod: {
      width: '100%'  
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
    blockAvatar: {
        height: 120,
        width: 120,
        borderRadius: 16,
        top: -60,
        position: 'absolute',
        backgroundColor: '#F6F6F6',
    },
    avatar: {
        height: 120,
        width: 120,
        borderRadius: 16,
    },
    addIcon: {
        position: 'absolute',
        left: 107,
        top: 81,
    },
    none: {
        display: 'none',
    }
})

export default Registration;