import Post from "./Post.js";
import User from "./User.js";
import Comment from "./Comment.js";

Post.belongsTo(User, {
  foreignKey: "author_id",
  as: "author",
  onDelete: "cascade",
});

Comment.belongsTo(User, {
  foreignKey: "author_id",
  as: "author",
  onDelete: "cascade",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
  as: "post",
  onDelete: "cascade",
});

export { User, Post, Comment };
