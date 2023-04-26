import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please add Username"],
        },
        email: {
            type: String,
            required: [true, "Please add user email"],
            unique: [true, "Email address already exist."],
        },
        password: {
            type: String,
            required: [true, "Please add password"],
        },
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model("User", userSchema);

export { UserModel };
