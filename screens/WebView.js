import React, { useState, useRef, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView, View, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import { setDoc, doc, collection } from 'firebase/firestore';
import { db } from '../config';

export default function AWView({route, navigation}){

    //Declaring params passed in navigation
    const { url, uid } = route.params;

    const [currentUrl, setCurrentUrl] = useState('');
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);

    //Reference of webview componenet 
    const webviewref = useRef(null);

    //Setting state for webview navigation
    const onNavigationStateChange = (webViewState) => {
        setCanGoBack(webViewState.canGoBack);
        setCanGoForward(webViewState.canGoForward);
        setCurrentUrl(webViewState.url);
    }

    //Sends request to server to get/add listing 
    //listing information in firebase 
    const getUrl = async () => {
        const params = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'productUrl': currentUrl,
                'uid': uid
            })
        }
        const response = await fetch(webhookURL, params)
        .then(() => {
            if (response === '200'){
                alert("We've added it to your watchlist!")
            } else {
                alert('Something went wrong, try again later.')
            }
        })
        .catch((error) =>{
            alert('Something went wrong, try again later.');
            console.log(error);
        });
    };

    //Function for back button
    const backAction = () => {
        if(canGoBack){
            webviewref.current.goBack();
        } else{
            navigation.goBack();
        }

        return true;
    }

    //Function for forward button
    const forwardAction = () => {
        if(webviewref.current) webviewref.current.goForward();
    }

    //Updates for back path instead of closing webview 
    useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress', backAction);

        () => BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, [ canGoBack ])

    //Nav/Action icons
    const backButton = <Icon name='arrow-left' size={30} color='white'/>;
    const forwardButton = <Icon name='arrow-right' size={30} color='white'/>;
    const addButton = <Icons name='ios-add-circle' size={50} color='white'/>;

    return(
        <SafeAreaView>
            <View style={{marginTop: 50, height: '85%', width: '100%'}}>
                <WebView 
                    ref={webviewref} 
                    startInLoadingState={true} 
                    source={{uri: url}} 
                    onNavigationStateChange={onNavigationStateChange}
                    />
            </View>
            <View style={styles.appBar}>
                <TouchableOpacity style={{marginBottom: '5%'}} onPress={backAction}>
                    {backButton}
                </TouchableOpacity>
                <TouchableOpacity style={{marginBottom: '5%'}} onPress={getUrl} >
                    {addButton}
                </TouchableOpacity>
                 <TouchableOpacity style={{marginBottom: '5%'}} onPress={forwardAction}>
                    {forwardButton}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    appBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '10%',
        width: '100%',
        position: 'relative',
        backgroundColor: '#049cb3',
    },
});
