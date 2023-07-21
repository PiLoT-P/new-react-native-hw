import {Image, StyleSheet, Text, View, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redus/auth/authSelector';
import { selectPosts } from '../../redus/posts/postsSelector';
import { readPosts } from '../../redus/posts/postsOperation';

const Posts = () => {
  const {name, email, avatar} = useSelector(selectUser)
  const dataList = useSelector(selectPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dataList.length === 0) {
      dispatch(readPosts());
    }
  }, [])

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={styles.textAvatarContainer}>
          <Text style={styles.avatarName}>{name}</Text>
          <Text style={styles.avatarEmail}>{email}</Text>
        </View>
      </View>
      <View style={styles.containerPosts}>
        <FlatList 
          data={dataList}
          renderItem={({ item }) => (
            <View style={styles.postsList}>
              <Image source={{uri: item.post.image }} style={styles.postPhoto} />
              <Text style={styles.postTitle}>{item.post.name}</Text>
              <View style={styles.comentTextContainer}>
                <TouchableOpacity style={styles.comentTextBlock} onPress={() => navigation.navigate("Comments", {id: item.postId, imageUrl: item.post.image, avatar: avatar})}>
                  <Ionicons name={'md-chatbubble-outline'} size={24} color={'#BDBDBD'}/>
                  <Text style={styles.coments}>{item.post.comments.length} </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.comentTextBlock} onPress={() => navigation.navigate("Map", { locationCoords: item.post.coords})}>
                  <Ionicons name={'location-outline'} size={24} color={'#BDBDBD'}/>
                  <Text style={styles.location}>{item.post.location}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    backgroundColor: '#FFFFFF'
  },
  avatarContainer: {
    flexDirection: 'row'
    
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#E8E8E8',
  },
  textAvatarContainer: {
    marginLeft: 8,
    justifyContent: 'center'
  },
  avatarName: {
    color: '#212121',
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
    fontWeight: 500,
  },
  avatarEmail: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    fontWeight: 400,
  },
  containerPosts: {
    paddingTop: 32,
    marginBottom: 32,
  },
  postsList: {
    marginBottom: 34,
  },
  postPhoto: {
    height: 240,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#E8E8E8',
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
    justifyContent: 'space-between',
  },
  comentTextBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coments: {
    marginLeft: 6,
    color: '#BDBDBD',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: 400,
  },
  location: {
    color: '#212121',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: 400,
    textDecorationLine: 'underline'
  }
});

export default Posts;