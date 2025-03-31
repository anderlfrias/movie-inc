import { Tabs } from "expo-router";
import {
  AccountIcon,
  FavoriteIcon,
  HomeIcon,
  SearchIcon,
} from "../../components/icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        tabBarStyle: { backgroundColor: "#000", height: 60, paddingTop: 10 },
        tabBarActiveTintColor: "#FFD700",
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color }) => <SearchIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          tabBarIcon: ({ color }) => <FavoriteIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ color }) => <AccountIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
