import {FlatList, Image, ImageBackground, StyleSheet, Text, View, } from 'react-native';
import bgImage from '../../images/PhotoBG-min.png';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redus/auth/authSelector';
import { selectPosts } from '../../redus/posts/postsSelector';
import { logout } from "../../redus/auth/authOperation";
import { useNavigation } from '@react-navigation/native';

const Profile = () => {

  const {name, avatar: image} = useSelector(selectUser)
  const dataList = useSelector(selectPosts);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  return (
    <ImageBackground source={bgImage} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <View style={styles.blockAvatar}>
          {image && <Image source={{ uri: image }} style={styles.avatar} />}
          {image ? <Icon style={styles.addIcon} name="closecircle" size={25} color={'#BDBDBD'} /> :
            <Icon style={styles.addIcon} name="pluscircleo" size={25} color={'#FF6C00'} />}
        </View>
        <Ionicons
          onPress={() => dispatch(logout())}
          name={'md-log-out-outline'} size={24} color={'grey'}
          style={styles.logOutBotton}
        />
        <Text style={styles.nameText}>{name}</Text>
        <View style={styles.containerPosts}>
          <FlatList 
            data={dataList}
            renderItem={({ item }) => (
              <View style={styles.postsList}>
                <Image source={{ uri: item.post.image }} style={styles.postPhoto} />
                <Text style={styles.postTitle}>{item.post.name}</Text>
                <View style={styles.comentTextContainer}>
                  <Ionicons name={'md-chatbubble-outline'} size={24} color={'#BDBDBD'} onPress={() => navigation.navigate("Comments", {id: item.postId, imageUrl: item.post.image, avatar: image})}/>
                  <Text style={styles.coments}>{item.post.comments.length} </Text>
                  <Ionicons style={styles.iconLocation} name={'thumbs-up-outline'} size={24} color={'#BDBDBD'} />
                  <Text style={styles.coments}>{item.post.likes}</Text>
                  <Ionicons style={styles.iconLocation} name={'location-outline'} size={24} color={'#BDBDBD'}/>
                  <Text style={styles.location} onPress={() => navigation.navigate("Map", { locationCoords: item.post.coords})}>{item.post.location}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: 147,
    // paddingBottom:
  },
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 46,
    alignItems: 'center',
  },
  blockAvatar: {
    height: 120,
    width: 120,
    borderRadius: 16,
    top: -60,
    position: 'absolute',
    backgroundColor: '#F6F6F6',
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 16,
  },
  addIcon: {
    position: 'absolute',
    left: 107,
    top: 81,
  },
  logOutBotton: {
    position: 'absolute',
    top: 22,
    right: 16,
  },
  nameText: {
    color: '#212121',
    fontSize: 30,
    fontFamily: 'Roboto-Medium',
    fontWeight: 500
  },
  containerPosts: {
    width: '100%',
    paddingTop: 33,
    paddingBottom: 12,
  },
  postsList: {
    marginBottom: 34,
  },
  postPhoto: {
    height: 240,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#E8E8E8',
    marginBottom: 8,
  },
  postTitle: {
    color: '#212121',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: 500,
  },
  comentTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  coments: {
    marginLeft: 6,
    color: '#BDBDBD',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: 400,
  },
  iconLocation: {
    marginLeft: 'auto'
  },
  location: {
    color: '#212121',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: 400,
    textDecorationLine: 'underline'
  }
});


export default Profile;