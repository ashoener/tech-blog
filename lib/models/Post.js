import db from "../../config/connection.js";
import { DataTypes, Model } from "sequelize";

class Post extends Model {}

Post.init(
  {
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          msg: "Post title must be at least 4 characters long",
          args: [4],
        },
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          msg: "Post content must be at least 4 characters long",
          args: [4],
        },
      },
    },
  },
  {
    sequelize: db,
    tableName: "posts",
    freezeTableName: true,
  }
);

export default Post;
