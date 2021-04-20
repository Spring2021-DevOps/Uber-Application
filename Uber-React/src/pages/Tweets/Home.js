import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import TweetList from "./TweetList";
import axios from 'axios';
import Map from '../../components/Map'

require('dotenv').config()

const THome = () => {
  const [bookings, setBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);  
  
  useEffect(() => {
    const fetchData = async () => {
      //const res = await fetch("http://localhost:5000/tweets-results");
      //const res = await fetch(`${process.env.REACT_APP_BE_NETWORK}:${process.env.REACT_APP_BE_PORT}/tweets-results`);
      //const res = await fetch(`${process.env.REACT_APP_API_SERVICE_URL}/tweets-results`);
      const res = await fetch("http://a6df721a5f50a4c0db1336cda1a5ea5e-1368272632.us-east-1.elb.amazonaws.com:5000/bookings");
      //const res = await fetch("http://localhost:5000/bookings");
      console.log(res);
      const { results } = await res.json();
      console.log(results);
      setBookings([...results]);
	    setLoading(false);
      console.log(bookings);
    };
 
    //print("Home.js: fetching from " + `${process.env.REACT_APP_API_SERVICE_URL}/tweets-results`)
    fetchData();
  }, []);

  return (
    
    <ScrollView noSpacer={true} noScroll={true} style={styles.container}>
	  {loading ? (
	    <ActivityIndicator
		  style={[styles.centering]}
		  color="#ff8179"
		  size="large"
	    />
	  ) : (
	    <TweetList bookings={bookings} />
	  )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    marginTop: '60px',
    opacity:0.75
  },
  centering: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    height: "100vh"
  }
});

export default THome;
