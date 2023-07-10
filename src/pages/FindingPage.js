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
      const response = await fetch("http://localhost:3001/show", {
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
      console.log(data);
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={styles.searchTextInput}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            onChangeText={onChangeKeyword}
            placeholderTextColor={"#929292"}
            style={styles.textInput}
            placeholder="검색"
            value={keyword}
          />
        </View>
      </View>
      {loading ? (
        <View
          style={{
            marginTop: 25,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color={"#fff"} />
        </View>
      ) : (
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
                // onPressIn={() => Keyboard.dismiss()}
                //  onPress={() => navigation.navigate("ReviewPage")}
                activeOpacity={1}
                style={styles.applicationBox}
                key={item.spot}
              >
                {/* <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={{ uri: `data:image/jpeg;base64,${item.image}` }}
                  style={styles.image}
                />
                </View> */}
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

  image: {
    height: 150,
    width: 150,
  },
});

export default FindingPage;
