import { Tabs } from "expo-router";

import { CustomTabBar } from "@/components/ui/custom-tab-bar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="calendar" options={{ title: "Calendar" }} />
      <Tabs.Screen name="chat" options={{ title: "Chat" }} />
      <Tabs.Screen
        name="categories"
        options={{ title: "Categories", href: null }}
      />
      <Tabs.Screen
        name="task-details"
        options={{ title: "Task Details", href: null }}
      />
    </Tabs>
  );
}
