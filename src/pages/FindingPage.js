import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

function FindingPage() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const navigation = useNavigation();

  const onChangeKeyword = useCallback((text) => {
    setKeyword(text.trim());
  }, []);

  const getList = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://10.0.2.2:3001/show", {
        method: "POST",
        body: JSON.stringify({
          key: keyword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setList(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onChangeKeyword("");
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      getList();
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [keyword]);

  const CardView = ({ data, image }) => (
    <View style={styles.CardContainer}>
      <Image
        source={{ uri: `data:image/jpeg;base64, ${image}` }}
        style={styles.image}
      />
      <View style={styles.cardContentContainer}>
        <Text style={styles.CardTitle}>{data.name}</Text>
        <Text style={styles.CardContent}>{data.spot}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 25, marginTop: 20 }}>
        <View style={styles.searchTextInput}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            onChangeText={onChangeKeyword}
            placeholderTextColor={"#CCCCCC"}
            style={styles.textInput}
            placeholder="검색"
            value={keyword}
          />
        </View>
      </View>
      {loading ? (
        <View
          style={{
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color={"#fff"} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: 20 }}
            keyExtractor={(item) => item.spot}
            data={list}
            disableScrollViewPanResponder={true}
            ListEmptyComponent={() => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text
                  style={{
                    color: "#fff",
                    display: loading ? "none" : "flex",
                    paddingVertical: 30,
                  }}
                >
                  검색 내용이 없습니다.
                </Text>
              </View>
            )}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPressIn={() => Keyboard.dismiss()}
                  onPress={() =>
                    navigation.navigate("ReviewPage", { id: item.spot })
                  }
                  activeOpacity={1}
                  style={styles.applicationBox}
                  key={item.spot}
                >
                  <CardView image={item.image} data={item} />
                  <View
                    style={{
                      justifyContent: "center",
                      flexDirection: "row",
                      paddingVertical: 10,
                      paddingHorizontal: 30,
                    }}
                  >
                    <Text style={[styles.fontStyle, { fontWeight: "bold" }]}>
                      {item.spot}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          <View style={styles.createButton}>
            <TouchableOpacity style={styles.floatingButton}>
              <Icon name="plus" size={25} color="#000000" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  fontStyle: {
    fontSize: 14,
    color: "black",
    marginTop: 6,
  },
  applicationBox: {
    borderBottomColor: "#3D3D3D",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  searchTextInput: {
    justifyContent: "center",
    height: 40,
    lineHeight: 40,
    paddingHorizontal: 5,
    backgroundColor: "#414141",
    marginTop: 15,
    borderRadius: 5,
  },

  textInput: {
    color: "#ffffff",
    fontSize: 16,
    marginLeft: 8,
    paddingHorizontal: 7,
    paddingVertical: 0,
  },

  CardContainer: {
    width: "90%",
    elevation: 5,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    margin: 20,
    elevation: 5,
    paddingBottom: 5,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 4,
  },
  cardContentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  CardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginStart: 5,
  },
  CardContent: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
    marginEnd: 5,
  },

  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
});

export default FindingPage;
