import Post from "./Post.js";
import User from "./User.js";

Post.belongsTo(User, {
  foreignKey: "author_id",
  as: "author",
  onDelete: "cascade",
});

export { User, Post };
