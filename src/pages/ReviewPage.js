import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

function ReviewPage({ route, navigation }) {
  const [loading, setLoading] = useState(true);

  const { id } = route.params;
  const [favorite, setFavorite] = useState("");
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [day, setDay] = useState("");
  const [image, setImage] = useState("");

  const finding = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://33dc-192-249-19-234.ngrok-free.app/finding",
        {
          method: "POST",
          body: JSON.stringify({
            id: id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      //[{"favorite": 1, "image": {"data": [Array], "type": "Buffer"}, "name": "아이스", "rating": 6, "review": "좋아요", "spot": "폭포"}]
      setFavorite(responseData[0].favorite);
      setName(responseData[0].name);
      setReview(responseData[0].review);
      setDay(responseData[0].day.slice(0, 10));
      setImage(responseData[0].image.data);
      //   <Image
      //   source={{ uri: `data:image/jpeg;base64, ${image}` }}
      //   style={styles.image}
      // />
    } catch (error) {
      console.error("Error occurred during fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  finding();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFF",
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <TouchableOpacity
        style={{ marginTop: 30, marginLeft: 15 }}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="left" size={30} />
      </TouchableOpacity>
      <View style={{ marginTop: 20, marginLeft: 35 }}>
        <View style={styles.profile}>
          <FontAwesome name="user" size={50} />
          <Text style={styles.name}>{name}</Text>
        </View>
        <Text
          style={{
            fontSize: 20,
            color: "black",
            marginTop: 10,
            fontFamily: "NanumSquareRoundR",
          }}
        >
          {day}
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          marginLeft: 35,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "black",
            marginTop: 10,
            fontWeight: "bold",
            fontFamily: "NanumSquareRoundB",
          }}
        >
          {id}
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          marginHorizontal: 35,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "black",
            fontFamily: "NanumSquareRoundR",
          }}
        >
          {review}
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <AntDesign name="like2" size={20} />
          <Text
            style={{
              fontSize: 20,
              color: "black",
              marginHorizontal: 10,
              fontFamily: "NanumSquareRoundR",
            }}
          >
            {favorite}
          </Text>
        </View>

        <Image
          source={{ uri: `data:image/jpeg;base64, ${image}` }}
          style={styles.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
    marginTop: 20,
  },
  profile: {
    flexDirection: "row",
    alignContent: "center",
    fontFamily: "NanumSquareRoundR",
  },
  name: {
    color: "black",
    fontSize: 20,
    // fontFamily: "NanumSquareRoundB",
    marginLeft: 18,
    alignItems: "center",
    top: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 4,
  },
});

export default ReviewPage;
