import { MessageCircle, Reply, MoreHorizontal } from "lucide-react";

const CommentThread = ({
  comments = [],
  onReply,
  onLike,
  onMenuClick,
  currentUserId,
}) => {
  const renderComment = (comment, depth = 0) => {
    const isOwner = currentUserId === comment.userId;

    return (
      <div key={comment.id} className="w-full">
        <div
          className={`flex gap-3 ${
            depth > 0 ? "ml-6 border-l border-gray-200 pl-4" : ""