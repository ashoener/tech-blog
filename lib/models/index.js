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

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "cascade",
});

export { User, Post, Comment };
