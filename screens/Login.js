import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { auth } from '../config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({ navigation }){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate('Home')
            }
        })

        return unsubscribe
    }, [])

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
    }

    return(
        <SafeAreaView style={styles.pageContainer}>
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>AmazonWatch</Text>
            </View>
            <View style={styles.loginContainer}>
                <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={text => setEmail(text)} />
                <TextInput style={styles.input} secureTextEntry placeholder='Password' value={password} onChangeText={text => setPassword(text)} />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.loginButton}onPress={handleSignIn}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
                        <Text style={styles.signupText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        height: '100%',
        backgroundColor: 'white',
    },
    logoContainer: {
        marginTop: '30%',
        marginHorizontal: 10,
        alignItems: 'center'
    },
    logo: {
        fontSize: 50,
        fontWeight: '700',
        color: '#049cb3'
    },
    loginContainer: {
        marginTop: 150,
        height: '50%',
        alignItems: 'center',
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: '#049cb3',
        marginBottom: 10,
        width: '80%',
        height: '20%',
        fontSize: 18
    },
    buttonContainer: {
        marginTop: 40,
        width: '80%',
    },
    loginButton: {
        marginBottom: 25,
        height: 50,
        backgroundColor: '#049cb3',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    loginText: {
        fontSize: 22,
        color: 'white'
    },
    signupButton: {
        marginBottom: 25,
        height: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signupText: {
        fontSize: 22,
        color: '#049cb3'
    },
})