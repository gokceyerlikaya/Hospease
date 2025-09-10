import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Hospease",
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="home"
                options={{
                    title: "Hastaneler",
                    headerStyle: { backgroundColor: "#2b6cb0" },
                    headerTintColor: "#fff",
                    headerTitleStyle: { fontWeight: "bold" },
                }}
            />
            <Stack.Screen
                name="Detaylar"
                options={{
                    title: "Hastane Detayları",
                    headerStyle: { backgroundColor: "#2b6cb0" },
                    headerTintColor: "#fff",
                    headerTitleStyle: { fontWeight: "bold" },
                }}
            />
        </Stack>
    );
}
