import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import {
  BrandColors,
  CommonColors,
  DarkColors,
  LightColors,
  TextColors,
} from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { TaskComment } from "@/data/tasks";

type CommentsSectionProps = {
  comments: TaskComment[];
  onDeleteCommentClick: (index: number) => void;
};

export function CommentsSection({
  comments,
  onDeleteCommentClick,
}: CommentsSectionProps) {
  const { isDark } = useTheme();
  const styles = getStyles(isDark);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <View style={styles.commentsSection}>
      {/* Comments List */}
      <View style={styles.commentsList}>
        {comments.map((comment, index) => (
          <View key={index} style={styles.commentItem}>
            <View style={styles.commentHeader}>
              <View style={styles.commentAvatar}>
                <Text style={styles.commentAvatarText}>
                  {comment.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.commentContent}>
                <Text style={styles.commentAuthor}>{comment.name}</Text>
                <Text style={styles.commentText}>{comment.comment}</Text>
                <Text style={styles.commentTime}>
                  {comment.createdAt
                    ? formatDate(comment.createdAt) +
                      " at " +
                      comment.createdAt.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : "Just now"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => onDeleteCommentClick(index)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="trash-outline"
                  size={18}
                  color={isDark ? DarkColors.dark4 : TextColors.secondary}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    commentsSection: {
      gap: 20,
    },
    commentsList: {
      gap: 20,
    },
    commentItem: {
      gap: 8,
    },
    commentHeader: {
      flexDirection: "row",
      gap: 12,
    },
    commentAvatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: BrandColors.main,
      alignItems: "center",
      justifyContent: "center",
    },
    commentAvatarText: {
      color: CommonColors.white,
      fontSize: 12,
      fontWeight: "600",
    },
    commentContent: {
      flex: 1,
      gap: 4,
    },
    commentAuthor: {
      fontSize: 14,
      fontWeight: "600",
      color: isDark ? CommonColors.white : TextColors.primary,
    },
    commentText: {
      fontSize: 14,
      lineHeight: 20,
      color: isDark ? DarkColors.dark4 : TextColors.secondary,
    },
    commentTime: {
      fontSize: 12,
      color: isDark ? DarkColors.dark3 : TextColors.placeholder,
    },
  });

