import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, TextInput, Button } from 'react-native';



const numberOfCols = 7


export default function CardGridSuit(suit) {
  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item, index)=>{return item.date}}
          numColumns={numberOfCols}
          renderItem={({item, index})=>(
            <View style={styles.viewpic}>
              <Image style={styles.image} source={{uri:item.url}}/>
            </View>
          )}
          />
    </SafeAreaView>
  );
}



;
