import React, { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Keyboard
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const WritePage = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const permisionFunction = async () => {
    const imagePermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (imagePermission.status !== 'granted') {
      alert('권한이 필요합니다');
    }
  };

  useEffect(() => {
    permisionFunction();
  }, []);

  const handleClose = () => {
    navigation.goBack();
  };

  const handlePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
    console.log(result.uri);
      setImage(result.uri);
      setImageName(result.uri.split('/').pop());
    }
  };

  const handleCheck = async () => {
    if (!title || !text || !image) {
      Alert.alert("All fields are required.");
      return;
    }

    try {
      let response = await fetch("https://33dc-192-249-19-234.ngrok-free.app/add", {
        method: "POST",
        body: JSON.stringify({
            spot: title,
            review: text,
            favorite: 5,
            name: "",
            image: image
          }),
          headers: {
            "Content-Type": "application/json",
          },
      });

      if (response.ok) {
        Alert.alert("Success!");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleClose} style={styles.closebutton}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCheck} style={styles.checkbutton}>
            <Text style={styles.buttonText}>Check</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="제목을 입력하세요"
        style={[styles.title, styles.centerTextInput]}
        onSubmitEditing={Keyboard.dismiss}
      />
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="내용을 입력하세요"
        style={styles.textinput}
        onSubmitEditing={Keyboard.dismiss}
      />
      <TouchableOpacity onPress={handlePick} style={styles.button}>
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
        marginTop: 10
      },
      button: {
        backgroundColor: "#D3D3D3",
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        alignSelf: "center",
      },
    closebutton: {
        backgroundColor: '#D3D3D3',
        padding: 10,
        borderRadius: 5,
    },
    checkbutton: {
        backgroundColor: '#D3D3D3',
        padding: 10,
        borderRadius: 5,
    },
    text: {
        fontSize: 30,
        color: "black",
        fontWeight: "bold",
    },
    title: {
        fontSize: 15,
        borderRadius: 15,
        width: "90%",
        height: 50,
        marginVertical: 10,
        marginTop: 40,
        backgroundColor: "white",
        borderColor: "white",
        padding: 15,
        alignSelf: "center"
      },
    textinput: {
        fontSize: 15,
        borderRadius: 15,
        width: "90%",
        height: 200,
        marginVertical: 10,
        marginTop: 15,
        backgroundColor: "white",
        borderColor: "white",
        padding: 15,
        alignSelf: "center"
    },
    buttonText: {
        fontSize: 20,
        paddingHorizontal: 10,
        color: "black",
        fontWeight: "bold"
    },
    centerTextInput: {
        textAlignVertical: 'center',
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