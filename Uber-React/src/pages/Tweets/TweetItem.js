import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const TweetItem = ({ item: booking }) => {
  return (
    <View style={styles.row}>
      <Image style={styles.rowIcon} source={""} />
      <View style={styles.rowData}>
  
        <Text style={styles.rowDataSubText}>First Name           : {booking.firstName}</Text><br></br>
        <Text style={styles.rowDataSubText}>Last Name            : {booking.lastName}</Text><br></br>
        <Text style={styles.rowDataSubText}>Source                   : {booking.source}</Text><br></br>
        <Text style={styles.rowDataSubText}>Destination          : {booking.destination}</Text><br></br>
        <Text style={styles.rowDataSubText}>Journey Date       : {booking.journeyDate}</Text><br></br>

      </View>
    </View>
  );
};

//rowIcon: consider adding, to handle BIG images:
//resizeMode: 'contain'
//resizeMode: 'cover'
//resiceMode: 'center'
// https://reactnative.dev/docs/image.html#resizemode
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginBottom: 25,
    backgroundColor: "white",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0,0,0,0.1)"
  },
  rowIcon: {
    width: 64,
    height: 64,
    marginRight: 20,
    borderRadius: "50%",
    boxShadow: "0 1px 2px 0 rgba(0,0,0,0.1)"
  },
  rowData: {
    flex: 1
  },
  rowDataText: {
    fontSize: 15,
    textTransform: "capitalize",
    color: "#4b4b4b"
  },
  rowDataSubText: {
    fontSize: 17,
    opacity: 0.9,
    color: "black",
    marginTop: 4
  }
});

export default TweetItem;