import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { db, auth } from '../config';
import { deleteDoc, doc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/SimpleLineIcons';


export default function ProductCard(props){

    //Gets UID for current user 
    const uid = auth.currentUser.uid;

    //States for showing the options menu 
    const [visible, setVisible] = useState(false);

    //Functions for setting the state of options menu 
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);

    //Menu icon
    const options = <Icon name='options' size={30} color='#049cb3' onPress={showMenu} />;

    //Deletes listings from firebase
    const deleteItems = async(docTitle) => {
        await deleteDoc(doc(db, 'userProducts', uid, 'Watchlist', docTitle));
    }

    //Opens listing in Amazon using deep linking
    const openListing = (link) => {
        Linking.openURL(link);
    }

    return(
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
                <Menu
                    visible={visible}
                    anchor={
                        <TouchableOpacity style={styles.options}>
                            {options}
                        </TouchableOpacity>
                    }
                    onRequestClose={hideMenu}
                >
                    <MenuItem onPress={() => deleteItems(props.title)}>Delete</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={()=> openListing(props.url)}>Visit</MenuItem>
                </Menu>
            </View>
            <View style={styles.productInfo}>
                <View style={styles.currentPriceContainer}>
                    <Text style={styles.currentHeader}>Current</Text>
                    <Text style={styles.currentPrice}>{props.currentPrice}</Text>
                </View>
                <Image style={{width: '25%', height: '100%', borderRadius: 10}} source={{uri: props.productPhoto}} />
                <View style={styles.lastPriceContainer}>
                    <Text style={styles.lastHeader}>Last</Text>
                    <Text style={styles.lastPrice}>{props.lastPrice}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 5
    },
    cardHeader: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    title: {
        width: '60%',
        fontWeight: '400',
        fontSize: 18,
        color: 'black',
        marginBottom: 10,
        position: 'absolute'
    },
    options: {
        position: 'relative',
        left: '400%'
    },
    productInfo: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '60%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    currentPriceContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    currentHeader: {
        fontSize: 18,
        color: 'black',
        fontWeight: '400',
    },
    currentPrice: {
        fontSize: 18,
        fontWeight: '700',
        color: 'green',
    },
    lastPriceContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    lastHeader: {
        fontSize: 18,
        color: 'black',
        fontWeight: '400',
    },
    lastPrice: {
        fontSize: 18,
        fontWeight: '700',
        color: 'red',
    },
})