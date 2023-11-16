import { View, Text, FlatList, StyleSheet } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import { useTheme } from "react-native-paper";
import { getActivities } from "@/api/activities";
import useFetchData from "@/hooks/useFetchData";

function Activities() {
  const theme = useTheme();
  const { courseId, courseName } = useLocalSearchParams();

  const {
    data: activities,
    error,
    loading,
  } = useFetchData(() => getActivities(courseId as string), []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{courseName}</Text>
      <FlatList
        data={activities}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) =>
            <Link
              href={{
                pathname: "/takeAttendance",
                params: {
                  courseName,
                  courseId,
                  activityId: item.id as string,
                  activitySlug: item.slug
                },
              }}
              style={{
                ...styles.card,
                backgroundColor: theme.colors.primary,
              }}
            >
              <Text style={{ color: "white" }}>
                {item.slug} - {new Date(item.date).toLocaleDateString("es-CL").replaceAll("-", "/")}
              </Text>
            </Link>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginVertical: 24,
    alignSelf: "center",
  },
  card: {
    padding: 16,
    margin: 16,
    borderRadius: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});

export default Activities;
