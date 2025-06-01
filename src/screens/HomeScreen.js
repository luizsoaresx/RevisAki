import React from "react";
import { TouchableOpacity, Text } from 'react-native';


export default function HomeScreen (){
    <TouchableOpacity
  onPress={() => {
    const db = SQLite.openDatabase('revisaki.db');
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users;',
        [],
        (_, { rows }) => {
          console.log('Usuários cadastrados:', rows._array);
        }
      );
    });
  }}
  style={{ padding: 10, backgroundColor: 'blue', marginTop: 20 }}
>
  <Text style={{ color: 'white' }}>Ver usuários no console</Text>
</TouchableOpacity>
}