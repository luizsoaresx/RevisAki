import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import DecksScreen from '../screens/DecksScreen';
import HomeScreen from '../screens/HomeScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import CardsScreen from '../screens/CardsScreen';
import NewCardScreen from '../screens/NewCardScreen';
import ProfileUpdateScreen from '../screens/ProfileUpdateScreen';
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#f2f2f2',
                    height: 90,
                    borderTopWidth: 0.5,
                    borderTopColor: '#ccc',
                },
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'Decks') {
                        return <Ionicons name="albums" size={size} color={color} />;
                    } else if (route.name === 'Home') {
                        return <Ionicons name="home" size={size} color={color} />;
                    } else if (route.name === 'Perfil') {
                        return <FontAwesome name="user-circle" size={size} color={color} />;
                    }

                    return null;
                },
                tabBarActiveTintColor: '#000',
                tabBarInactiveTintColor: '#aaa',
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginBottom: 8,
                },
            })}
        >
            <Tab.Screen name="Decks" component={DecksScreen} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Perfil" component={UserProfileScreen} />

            <Tab.Screen
                name="CardsScreen"
                component={CardsScreen}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: () => null,
                    tabBarItemStyle: { display: 'none' },
                }}
            />
            <Tab.Screen
                name="NewCard"
                component={NewCardScreen}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: () => null,
                    tabBarItemStyle: { display: 'none' },
                }}
            />
            <Tab.Screen
                name="ProfileUpdate"
                component={ProfileUpdateScreen}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: () => null,
                    tabBarItemStyle: { display: 'none' },
                }}
            />
        </Tab.Navigator>
    );
}