import {
  Heart,
  MessageCircle,
  Bookmark,
  MoreHorizontal,
  Play,
} from "lucide-react";

const ContentCard = ({
  id,
  title,
  excerpt,
  author,
  thumbnail,
  category,
  contentType = "article",
  likes = 0,
  comments = 0,