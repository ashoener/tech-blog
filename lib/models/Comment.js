import db from "../../config/connection.js";
import { DataTypes, Model } from "sequelize";

class Comment extends Model {}

Comment.init(
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
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: "posts",
        key: "id",
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          msg: "Comment content must be at least 4 characters long",
          args: [4],
        },
      },
    },
  },
  {
    sequelize: db,
    tableName: "comments",
    freezeTableName: true,
  }
);

export default Comment;
