import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { useRoute } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';

function ReviewPage() {
    const route = useRoute();
    const spot = route.params?.spot;
    return (
        <View style={styles.container}>
        <View style={styles.header} />
        <View style={styles.title}>
          <Text style={{fontSize:35,color:'white'}}>{spot}</Text>
        </View>
        <View style={styles.content}>
          <Image
            style={{height:'100%',width:'100%',resizeMode:'contain'}}
            source={require('TestProject/images/img.jpg')}/>
        </View>
      </View>
    );
}

export default ReviewPage;