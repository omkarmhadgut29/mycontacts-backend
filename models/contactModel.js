import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        name: {
            type: String,
            required: [true, "Please add contact name"],
        },
        email: {
            type: String,
            required: [true, "Please add contact email address"],
        },
        phone: {
            type: String,
            required: [true, "Please add contact phone number"],
        },
    },
    {
        timestamps: true,
    }
);

const ContactModel = mongoose.model("Contact", contactSchema);

export { ContactModel };
