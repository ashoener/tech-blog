import db from "../../config/connection.js";
import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";

class Post extends Model {
  async validatePassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

Post.init(
  {
    author: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: "users",
        key: "id",
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
