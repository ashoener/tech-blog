import Post from "./Post.js";
import User from "./User.js";

User.hasMany(Post, {
  foreignKey: "author",
  onDelete: "cascade",
});

export { User, Post };
