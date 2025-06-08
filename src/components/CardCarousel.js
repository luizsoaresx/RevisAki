import React from 'react';
import { ScrollView, View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/GlobalStyle";
import { useNavigation } from '@react-navigation/native';

const CardCarousel = ({ cards, navigation }) => {
    if (!cards || cards.length === 0) {
        return null;
    }

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={localStyles.cardCarouselContainer}
        >
            {cards.map((card) => (
                <TouchableOpacity
                    key={card.id}
                    style={localStyles.cardCarouselItem}
                    onPress={() => navigation.navigate("CardsScreen", { deckId: card.deckId, deckName: card.deckName })}
                >
                    <View style={localStyles.cardCarouselTop}>
                        <Ionicons name="ellipsis-horizontal" size={18} color="#fff" />
                    </View>
                    <View style={localStyles.cardCarouselContent}>
                        <Text style={localStyles.cardCarouselText}>{card.title}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default CardCarousel;

const localStyles = StyleSheet.create({
    cardCarouselContainer: {
        paddingVertical: 10,
        paddingHorizontal: 0,
    },
    cardCarouselItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        width: 160,
        height: 150,
        marginRight: 15,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    cardCarouselTop: {
        backgroundColor: colors.azulClaro,
        height: 25,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 8,
    },
    cardCarouselContent: {
        padding: 10,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardCarouselText: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 14,
        textAlign: 'center',
        color: colors.preto,
    },
});
