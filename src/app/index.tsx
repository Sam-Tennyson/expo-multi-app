import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import CustomHeader from "@/components/ui/custom-header";
import { Spacing } from "@/constants/theme";
import { getPrimaryColor } from "@/core/app-config";
import { commonStyles } from "@/core/common-styles";
import { useNotifications } from "@/hooks/use-notifications";
import { useTheme } from "@/hooks/use-theme";
import { type TodoFilter, useTodos } from "@/hooks/use-todos";

const filters: TodoFilter[] = ["all", "active", "completed"];

export default function TodoScreen() {
  const theme = useTheme();
  const primaryColor = getPrimaryColor();
  const {
    todos,
    visibleTodos,
    filter,
    setFilter,
    isReady,
    addTodo,
    toggleTodo,
    deleteTodo,
  } = useTodos();
  const { scheduleTodoReminder } = useNotifications();
  const [title, setTitle] = useState("");

  const submit = () => {
    const todo = addTodo(title);
    if (!todo) return;
    setTitle("");
  };

  return (
    <ThemedView style={commonStyles.screen}>
      <SafeAreaView style={commonStyles.safeArea}>
        <ScrollView
          contentContainerStyle={commonStyles.content}
          keyboardShouldPersistTaps="handled"
        >
          <CustomHeader />

          <View style={commonStyles.composer}>
            <TextInput
              accessibilityLabel="New todo title"
              onChangeText={setTitle}
              onSubmitEditing={submit}
              placeholder="What needs doing?"
              placeholderTextColor={theme.textSecondary}
              returnKeyType="done"
              style={[
                styles.input,
                { color: theme.text, backgroundColor: theme.backgroundElement },
              ]}
              value={title}
            />
            <Pressable
              accessibilityRole="button"
              disabled={!title.trim()}
              onPress={submit}
              style={[
                styles.addButton,
                { backgroundColor: primaryColor },
                !title.trim() && styles.disabled,
              ]}
            >
              <ThemedText style={styles.lightText}>Add</ThemedText>
            </Pressable>
          </View>

          <View style={styles.filters}>
            {filters.map((item) => (
              <Pressable
                key={item}
                onPress={() => setFilter(item)}
                style={[
                  styles.filter,
                  {
                    backgroundColor:
                      filter === item ? primaryColor : theme.backgroundElement,
                  },
                ]}
              >
                <ThemedText
                  style={filter === item && styles.lightText}
                  type="smallBold"
                >
                  {item[0].toUpperCase() + item.slice(1)}
                </ThemedText>
              </Pressable>
            ))}
          </View>

          {!isReady ? (
            <ThemedText themeColor="textSecondary">Loading todos…</ThemedText>
          ) : visibleTodos.length === 0 ? (
            <ThemedView type="backgroundElement" style={styles.empty}>
              <ThemedText type="smallBold">Nothing here yet</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {todos.length
                  ? "Try another filter."
                  : "Add your first todo above."}
              </ThemedText>
            </ThemedView>
          ) : (
            <View style={styles.list}>
              {visibleTodos.map((todo) => (
                <ThemedView
                  key={todo.id}
                  type="backgroundElement"
                  style={styles.todo}
                >
                  <Pressable
                    accessibilityLabel={`Mark ${todo.title} ${todo.completed ? "active" : "complete"}`}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: todo.completed }}
                    onPress={() => toggleTodo(todo.id)}
                    style={[
                      styles.checkbox,
                      { borderColor: primaryColor },
                      todo.completed && { backgroundColor: primaryColor },
                    ]}
                  >
                    {todo.completed && (
                      <ThemedText style={styles.lightText}>✓</ThemedText>
                    )}
                  </Pressable>
                  <ThemedText
                    style={[
                      styles.todoTitle,
                      todo.completed && styles.completed,
                    ]}
                  >
                    {todo.title}
                  </ThemedText>
                  <Pressable
                    onPress={() =>
                      void scheduleTodoReminder(todo.title, todo.id)
                    }
                  >
                    <ThemedText type="small" style={{ color: primaryColor }}>
                      Remind
                    </ThemedText>
                  </Pressable>
                  <Pressable onPress={() => deleteTodo(todo.id)}>
                    <ThemedText type="small" themeColor="textSecondary">
                      Delete
                    </ThemedText>
                  </Pressable>
                </ThemedView>
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    minHeight: 48,
    borderRadius: Spacing.three,
    paddingHorizontal: Spacing.three,
    fontSize: 16,
  },
  addButton: {
    minWidth: 72,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Spacing.three,
  },
  filters: { flexDirection: "row", gap: Spacing.two },
  filter: {
    flex: 1,
    alignItems: "center",
    padding: Spacing.two,
    borderRadius: Spacing.five,
  },
  lightText: { color: "#fff", fontWeight: "700" },
  disabled: { opacity: 0.45 },
  empty: {
    padding: Spacing.four,
    alignItems: "center",
    gap: Spacing.two,
    borderRadius: Spacing.three,
  },
  list: { gap: Spacing.two },
  todo: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  todoTitle: { flex: 1 },
  completed: { textDecorationLine: "line-through", opacity: 0.55 },
});
