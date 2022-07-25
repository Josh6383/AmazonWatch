import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput, Keyboard } from 'react-native';
import { auth } from '../config';
import { updateEmail, updatePassword, deleteUser } from 'firebase/auth';

export default function Profile(){

    const [updatedEmail, setUpdatedEmail] = useState('');
    const [updatedPassword, setUpdatedPassword] = useState('');

    //Change email with firebase 
    const changeEmail = () => {
        updateEmail(auth.currentUser, updatedEmail).then(() => {
            alert('email')
        }).catch((error) => {
            alert(error)
        }); 
    }

    //Change password with firebase
    const changePassword = () => {
        updatePassword(auth.currentUser, updatedPassword).then(() => {
            // Update successful.
        }).catch((error) => {
            // An error ocurred
            // .
        });
    }

    //Deletes account 
    const deleteAccount = () => {
        deleteUser(user).then(() => {
            // User deleted.
        }).catch((error) => {
            // An error ocurred
            // ...
        });
    }

    return(
        <SafeAreaView style={styles.pageContainer} accessible={false} onPress={Keyboard.dismiss}>
            <View style={styles.card}>
                <View style={styles.emailContainer}>
                    <View style={styles.labelContainer}>
                        <Text>Email</Text>
                        <TextInput selectionColor={'#049cb3'} style={styles.input} onChangeText={(text) => setUpdatedEmail(text)} />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => changeEmail}>
                        <Text style={styles.label}>Change Email</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.passwordContainer}>
                    <View style={styles.labelContainer}>
                        <Text>Password</Text>
                        <TextInput selectionColor={'#049cb3'} style={styles.input} onChangeText={(text) => setUpdatedPassword(text)} />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => changePassword} >
                        <Text style={styles.label}>Change Password</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.deleteContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => deleteAccount} >
                        <Text style={styles.label}>Delete Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        marginTop: '13%',
        height: '94%',
        justifyContent: 'center',
        backgroundColor: '#049cb3',
    },
    card: {
        marginHorizontal: '5%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        backgroundColor: 'white'
    },
    emailContainer: {
        width: '70%',
        height: '25%',
    },
    passwordContainer: {
        width: '70%',
        height: '25%',
        marginTop: '15%',
    },
    deleteContainer: {
        width: '70%',
        height: '25%'
    },
    button: {
        width: '100%',
        height: '30%',
        borderRadius: 55,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#049cb3',
        position: 'absolute',
        bottom: 0,
    },
    label: {
        color: 'white',
        fontSize: 18
    },
    labelContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '60%'
    },
    input: {
        borderBottomWidth: 1,
        width: '100%',
        fontSize: 18
    }
})