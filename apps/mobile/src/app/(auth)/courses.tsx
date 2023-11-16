import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useTheme } from "react-native-paper";
import { getCourses } from "@/api/courses";
import useFetchData from "@/hooks/useFetchData";

function Courses() {
  const { colors } = useTheme();

  const {
    data: courses,
    error,
    loading,
  } = useFetchData(() => getCourses(), []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tienes permiso para tomar asistencia en</Text>
      {courses.map((course) => (
        <Link
          href={{
            pathname: "/(auth)/activities",
            params: { courseId: course.id, courseName: course.name },
          }}
          key={course.id}
          style={[styles.courseButton, { backgroundColor: colors.primary }]}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.text}>
              {course.name}
            </Text>
          </View>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    margin: 16,
    alignSelf: "center",
    textAlign: "center",
  },
  courseButton: {
    borderRadius: 8,
    flexDirection: "row",
    margin: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    flex: 1,
  },
});

export default Courses;
