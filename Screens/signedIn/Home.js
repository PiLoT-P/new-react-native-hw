import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Posts from "./PostsScreen";
import Profile from "./ProfileScreen";
import CreatePost from "./CreatePostsScreen";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../../redus/auth/authOperation";

const Tabs = createBottomTabNavigator();

const Home = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Posts') {
                        iconName = focused ? 'grid-outline' : 'grid-outline';
                    } else if (route.name === 'CreatePost') {
                        iconName = focused ? 'add' : 'add';
                    } else if (route.name = 'Profile') {
                        iconName = focused ? 'person' : 'person';
                    }

                    return <Ionicons name={iconName} size={size} color={route.name === 'CreatePost' ? '#fff' : color} />
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: [
                    {
                        display: 'flex',
                    },
                    null
                ],
                tabBarButton: (props) => {
                    if (route.name === 'CreatePost') {
                        return (
                            <TouchableOpacity
                                {...props}
                                style={styles.buttonCreate}
                            >
                                {props.children}
                            </TouchableOpacity>
                        );
                    }
                    return <TouchableOpacity {...props} style={styles.allButton} />;
                },
            })}
        >
            <Tabs.Screen name="Posts" component={Posts} options={{
                tabBarShowLabel: false,
                title: "Публікації",
                headerStyle: {
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#0000004d',
                },
                headerTitleStyle: {
                    marginLeft: '55%',
                    color: '#212121',
                    fontFamily: 'Roboto-Medium',
                    fontSize: 17,
                    fontWeight: 500,
                    lineHeight: 22,
                },
                headerRight: () => (
                    <Ionicons
                        onPress={() => dispatch(logout())}
                        name={'md-log-out-outline'} size={24} color={'grey'}
                        style={styles.logOutBotton}
                    />
                ),
                tabBarStyle: {
                    height: 70,
                    borderTopWidth: 0.5,
                    borderTopColor: '#0000004d',
                    paddingLeft: 82,
                    paddingRight: 82,
                    paddingTop: 9,
                    paddingBottom: 34,
                },
            }} />
            <Tabs.Screen name="CreatePost" component={CreatePost} options={{
                tabBarShowLabel: false,
                title: "Створити публікацію",
                headerStyle: {
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#0000004d',
                },
                headerTitleStyle: {
                    marginLeft: '24%',
                    color: '#212121',
                    fontFamily: 'Roboto-Medium',
                    fontSize: 17,
                    fontWeight: 500,
                    lineHeight: 22,
                },
                tabBarStyle: {
                    display: 'none',
                },
                headerLeft: () => (
                    <Ionicons
                        onPress={() => navigation.goBack()}
                        name={'arrow-back'} size={24} color={'grey'}
                        style={styles.goBackBotton}
                    />
                ),
            }} />
            <Tabs.Screen name="Profile" component={Profile} options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 70,
                    borderTopWidth: 0.5,
                    borderTopColor: '#0000004d',
                    paddingLeft: 82,
                    paddingRight: 82,
                    paddingTop: 9,
                    paddingBottom: 34,
                },
            }} />
        </Tabs.Navigator>
    );
}

const styles = StyleSheet.create({
    logOutBotton: {
        marginRight: 16,
    },
    goBackBotton: {
        marginLeft: 16
    },
    containerButton: {
        width: 50,
    },
    buttonCreate: {
        width: 70,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FF6C00',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 32,
        marginRight: 32,
    },
    allButton: {
        width: 40,
        height: 40,
        position: 'relative'
    }
    // iconStyle: {
    //     color: '#fff',
    // },
    // buttonCreate: {
    //     maxWidthwidth: 70,
    //     height: 40,
    //     borderRadius: 20,
    //     backgroundColor: '#FF6C00',
    // },
});


export default Home;