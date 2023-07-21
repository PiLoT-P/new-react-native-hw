import { useEffect, useState} from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redus/posts/postsOperation';

const CreatePost = () => {
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [location, setLocation] = useState(null);
  const [coords, setCoords] = useState({});

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
        } else {
          let location = await Location.getCurrentPositionAsync({});
          const coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };

          const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`;
          const response = await axios.get(nominatimUrl);
          const { address } = response.data;
          setLocation(`${address.state}, ${address.country}`);
          setCoords(coords);
        }
      } catch (error) {
        console.error("Error while getting location:", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (image && name && location) {
      setSubmitDisabled(false);
    }
  }, [image, name, location]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const navigation = useNavigation();

  const trashAll = () => {
    setImage(null);
    setName('');
  };

  const submitForm = () => {
    const dataToSend = {
      image,
      name,
      coords,
      location,
      likes: 0,
      comments: [],
    };

    dispatch(createPost(dataToSend));
    console.log('create post');
    navigation.navigate("Posts");
  }

  return (
    <View style={styles.container}>
      {image ? 
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: image }} />
          <Ionicons onPress={() => setImage(null)} style={styles.iconCameraImage} name={'camera'} size={24} color={'#BDBDBD'}/>
        </View>
        : <Camera
        style={styles.camera}
        type={type}
        ref={setCameraRef}
      >
        <View style={styles.photoView}>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              if (cameraRef) {
                const { uri } = await cameraRef.takePictureAsync();
                await MediaLibrary.createAssetAsync(uri);
                setImage(uri);
              }
            }}
          >
            <View style={styles.takePhotoOut}>
              <Ionicons style={styles.iconCamera} name={'camera'} size={24} color={'#BDBDBD'}/>
            </View>
          </TouchableOpacity>
        </View>
        </Camera>}
      {image ? <Text style={styles.textImage}>Редагувати фото</Text>: <Text style={styles.textImage}>Завантажте фото</Text>}
      <View style={styles.formContainer}>
        <TextInput
          onChangeText={(val) => setName(val)}
          value={name}
          placeholder={"Назва..."}
          placeholderStyle={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: '#BDBDBD', fontWeight: 400, }}
          style={styles.inputBlock}
        ></TextInput>
        <View style={styles.locationContainer}>
          <TextInput
            value={location}
            placeholder={"Місцевість..."}
            placeholderStyle={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: '#BDBDBD', fontWeight: 400, }}
            style={[styles.inputBlock, styles.inputBlockLocation]}
          ></TextInput>
          <Ionicons style={styles.iconLocation} name={'location-outline'} size={24} color={'#BDBDBD'}/>
        </View>
      </View>
      <TouchableOpacity
        aria-disabled={submitDisabled}
        style={[styles.formButton, submitDisabled ? styles.formButtonDisable : null]}
        onPress={() => submitForm()}
      >
        <Text style={[styles.formBottomText, submitDisabled? styles.formBottomTextDisable : null]}>Опублікувати</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => trashAll()} style={styles.trashBlock}>
        <Ionicons style={styles.iconTrash} name={'trash-outline'} size={24} color={'#BDBDBD'}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,

  },
  imageContainer: {
    backgroundColor: '#F6F6F6',
    height: 240,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    position: 'relative',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 248,
    borderRadius: 8,
  },
  iconCameraImage: {
    position: 'absolute',
    top: 90,
    left: '42%',
    backgroundColor: '#ffffff4d',
    padding: 18,
    borderRadius: 50,
  },
  textImage: {
    color: '#BDBDBD',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: 400,
  },
  formContainer: {
    gap: 16,
    paddingTop: 32,
    paddingBottom: 32,
  },
  formButton: {
    width: '100%',
    backgroundColor: '#FF6C00',
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 100,
  },
  formButtonDisable: {
    backgroundColor: '#F6F6F6',

  },
  formBottomText: {
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: 400,
  },
  formBottomTextDisable: {
    color: '#BDBDBD',
  },
  inputBlock: {
    width: '100%',
    height: 50,
    borderRadius: 6,
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
    paddingTop: 16,
    paddingBottom: 15,
  },
  locationContainer: {
    position: 'relative'
  },
  iconLocation: {
    position: 'absolute',
    top: 13,
  },
  inputBlockLocation: {
    paddingLeft: 28,
  },
  trashBlock: {
    marginLeft: '40%',
    marginTop: 'auto',
    marginBottom: 32,
    height: 40,
    width: 70,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 23,
    paddingRight: 23,
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
  },
  //
  camera: {
    height: 240,
    borderRadius: 8,
  },
  photoView: {
    height: '100%',
    backgroundColor: "transparent",
    justifyContent: "center",
  },

  button: { alignSelf: "center" },

  takePhotoOut: {
    height: 60,
    width: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: '#ffffff4d'
  },
  iconCamera: {
    
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});


export default CreatePost;


{/* <View style={styles.imageContainer}>
        {image && <Image style={styles.image} source={{ uri: image }} />}
        <Ionicons onPress={pickImage} style={[styles.camera, image ? styles.cameraFocus: null]} name={'camera'} size={24} color={'#BDBDBD'}/>
      </View>
      {image? <Text style={styles.textImage}>Редагувати фото</Text>: <Text style={styles.textImage}>Завантажте фото</Text>} */}