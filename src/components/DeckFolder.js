import React from "react";
import { FlatList, TouchableOpacity, Text } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/DecksScreenStyle";
import { colors } from "../styles/GlobalStyle";

export default function DeckFolder({ decks, onDeckPress }) {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.deckItem}
            onPress={() => onDeckPress(item)}
        >
            <MaterialIcons name="folder" size={44} color={colors.brancoComponents} />
            <Text style={styles.deckTitle}>{item.title}</Text>
            <Ionicons name="ellipsis-vertical" size={24} color={colors.brancoComponents} />
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={decks}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.deckList}
        />
    );
}
