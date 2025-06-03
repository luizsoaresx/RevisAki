import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/GlobalStyle";
import { useNavigation } from '@react-navigation/native';

const mockCards = [
    { id: '1', titulo: 'Cartão 1' },
    { id: '2', titulo: 'Cartão 2' },
    { id: '3', titulo: 'Cartão 3' },
    { id: '4', titulo: 'Cartão 4' },
];

const CardItem = ({ titulo, onPress }) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
        <View style={styles.cardTop}>
            <Ionicons name="ellipsis-horizontal" size={18} color="#fff" />
        </View>
        <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{titulo}</Text>
        </View>
    </TouchableOpacity>
);

export default function CardCarousel({ navigation }) {
    return (
        <FlatList
            data={mockCards}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <CardItem
                    titulo={item.titulo}
                    onPress={() => navigation.navigate("CardsScreen")}
                />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 16 }}
        />
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        width: 160,
        height: 180,
        marginRight: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTop: {
        backgroundColor: colors.azulClaro,
        height: 35,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
});
