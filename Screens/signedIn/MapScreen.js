import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Map = () => {
  const { params: { locationCoords } } = useRoute();

  return (
      <View style={styles.container}>
          <MapView
              style={styles.mapStyle}
              region={{
              latitude: locationCoords.latitude,
              longitude: locationCoords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
              }}
              mapType="standard"
              minZoomLevel={15}
              onMapReady={() => console.log("Map is ready")}
              onRegionChange={() => console.log("Region change")}
          >
              <Marker
              title="Ваш маркер"
              coordinate={locationCoords}
              description='Місце де було зробленно фото'
              />
          </MapView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Map;