import React, { useState, useEffect, createRef, useRef } from "react";
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
  StatusBar,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { AntDesign } from "@expo/vector-icons";

const imagePickerOption = {
  mediaType: "photo",
  maxWidth: 500,
  maxHeight: 500,
  includeBase64: Platform.OS === "android",
};

function WritePage({ route, navigation }) {
  // const{ name } = route.params;
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [imageName, setImageName] = useState(null);

  const titleRef = createRef();
  const textRef = createRef();

  const permisionFunction = async () => {
    const imagePermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    setGalleryPermission(imagePermission.status === "granted");
    if (imagePermission.status !== "granted") {
      alert("권한이 필요합니다");
    }
  };

  useEffect(() => {
    permisionFunction();
  }, []);

  const pick = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      try {
        const { uri } = pickerResult;
        setImage(await fetch(uri));
      } catch (error) {
        console.log("Error reading image file:", error);
      }
    }
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const handleCheck = async () => {
    if (!title) {
      Alert.alert("제목을 입력하세요.");
      return;
    }
    if (!text) {
      Alert.alert("내용을 입력하세요.");
      return;
    }

    if (!image) {
      Alert.alert("사진을 추가하세요.");
      return;
    }

    const randomFavorite = Math.floor(Math.random() * 100) + 1;

    const formData = new FormData();
    formData.append("spot", title);
    formData.append("review", text);
    formData.append("favorite", randomFavorite);
    formData.append("name", name);
    formData.append("image", image);

    try {
      const response = await fetch(
        "https://33dc-192-249-19-234.ngrok-free.app/add",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Success!");
        navigation.navigate("FindingPage");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          // backgroundColor: "#D3D3D3",
          paddingTop: StatusBar.currentHeight,
          width: "100%",
          height: 50,
          position: "sticky",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            alignContent: "center",
            paddingHorizontal: 20,
            marginHorizontal: 10,
          }}
        >
          <TouchableOpacity onPress={handleClose}>
            <AntDesign name="close" size={30} />
          </TouchableOpacity>
          <Text
            style={{
              color: "black",
              fontSize: 20,
              fontFamily: "NanumSquareRoundB",
              marginLeft: 25,
            }}
          >
            후기 작성하기
          </Text>
          <TouchableOpacity onPress={handleCheck}>
            <AntDesign name="check" size={30} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderBottomColor: "#C4C4C4",
            borderBottomWidth: 1,
            marginTop: 10,
            marginBottom: 10,
          }}
        />
      </View>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="제목을 입력하세요"
        style={[styles.title, styles.centerTextInput]}
        ref={titleRef}
        onSubmitEditing={() => textRef.current.focus()}
      />
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="내용을 입력하세요"
        style={styles.textinput}
        ref={textRef}
        onSubmitEditing={() => Keyboard.dismiss()}
      />
      <TouchableOpacity onPress={pick} style={styles.button}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {imageName && (
          <View>
            <Text style={styles.imageName}>{imageName}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    backgroundColor: "#D3D3D3",
    width: "100%",
    height: 50,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    position: "sticky",
    top: 0,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },

  button: {
    backgroundColor: "#D3D3D3",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 30,
    alignSelf: "center",
  },

  closebutton: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
  },

  checkbutton: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
  },

  text: {
    fontSize: 30,
    color: "black",
    fontFamily: "NanumSquareRoundB",
  },
  title: {
    fontSize: 15,
    borderRadius: 15,
    width: "90%",
    height: 50,
    marginVertical: 10,
    marginTop: 40,
    backgroundColor: "#E3F2FD",
    borderColor: "#E3F2FD",
    padding: 15,
    alignSelf: "center",
    fontFamily: "NanumSquareRoundR",
  },
  textinput: {
    fontSize: 15,
    borderRadius: 15,
    width: "90%",
    height: 200,
    marginVertical: 10,
    marginTop: 15,
    backgroundColor: "#E3F2FD",
    borderColor: "#E3F2FD",
    padding: 15,
    alignSelf: "center",
    fontFamily: "NanumSquareRoundR",
  },

  buttonText: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: "black",
    fontWeight: "bold",
    fontFamily: "NanumSquareRoundR",
  },
  centerTextInput: {
    textAlignVertical: "center",
  },

  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 300,
    height: 250,
  },
});

export default WritePage;
