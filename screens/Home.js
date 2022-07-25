import React, { useState, useEffect, useCallback } from 'react';
import { RefreshControl, View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db, auth } from '../config';
import { collection, getDocs } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/EvilIcons';
import ProductCard from '../components/ProductCard';

//Function for refresh time
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Home({ navigation }){

    //Various states
    const [refreshing, setRefreshing] = useState(false);
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');

    //Gets UID for current user 
    const uid = auth.currentUser.uid;

    //Reference for listing path in firebase
    const itemsCollectionRef = collection(db, 'userProducts', uid, 'Watchlist');

    //Calls listings from firebase
    const getItems = async () => {
        const data = await getDocs(itemsCollectionRef);
        setItems(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    //Takes user search string and hands it off
    //to the webview for amazon
    const searchText = () => {
        if ( keywords.some(keyword => search.includes(keyword) )) {
            navigation.navigate('AWView', {url: search.toString(),});
        } else {
            const searchUrl = 'https://www.amazon.com/s?url=search-alias%3Daps&field-keywords=' + search.replace(/\s/g, '+').toLocaleLowerCase().toString();
            navigation.navigate('AWView', {url: searchUrl, uid: uid});
        }
    }
    
    //Keyword for detecting url vs search string
    const keywords = ['amazon.com'];

    //Icons
    const profileIcon = <Icon name='user' size={50} color='white' onPress={() => navigation.navigate('Profile')} />;
    const searchIcon = <Icon name='search' size={30} color='#999999'/>;

    //Logic for listing refresh 
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getItems();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    //Calls listings on page load
    useEffect(() => {

        const getItems = async () => {
            const data = await getDocs(itemsCollectionRef);
            setItems(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        getItems();
    }, [])

    return(
        <SafeAreaView onPress={Keyboard.dismiss} accessible={false} style={styles.pageView}>
            <View style={styles.appBar}>
                <Text style={styles.title}>AmazonWatch</Text>
                <TouchableOpacity style={styles.profileIcon}>
                    {profileIcon}
                </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.searchBorder}>
                    <TouchableOpacity style={styles.searchIcon}>
                        {searchIcon}
                    </TouchableOpacity>
                    <TextInput style={styles.searchBar} placeholder='Search Products or Place A Link' onSubmitEditing={searchText} onChangeText={text => setSearch(text)} selectionColor={'#049cb3'} />
                </View>
            </View>
            <View style={styles.cardBackground}>
                <ScrollView 
                    showVerticalScrollIndicator={false} 
                    style={styles.scrollView} 
                    contentContainerStyle={{alignItems: 'center', flexGrow: 1, paddingBottom: 300}}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                    }
                >
                    {items.map((item, index) => {
                        return(
                            <View style={styles.cardView} key={index}>
                                <ProductCard url={item.url} title={item.title} currentPrice={item.currentPrice} lastPrice={item.lastPrice} productPhoto={item.productPhoto} />
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pageView: {
        backgroundColor: '#049cb3',
        height: '100%',
    },
    cardView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '40%',
        width: '90%',
        marginVertical: 10,
    },
    appBar: {
        height: '9%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: 'white',
        position: 'absolute'
    },
    profileIcon: {
        position: 'relative',
        left: '215%'
    },
    searchContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10%',
        marginBottom: 10,
    },
    searchBorder: {
        backgroundColor: 'white',
        borderRadius: 30,
        width: '90%',
        height: '70%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchIcon: {
        margin: 5,
    },
    searchBar: {
        marginHorizontal: 5,
        marginVertical: 6,
        width: '80%',
        height: '50%',
    },
    cardBackground: {
        flex: 1,
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
    },
    scrollView: {
        height: '100%',
        width: '100%',
    },
})