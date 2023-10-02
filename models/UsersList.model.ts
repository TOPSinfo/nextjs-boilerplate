import { Document, model, Model, models, Schema } from "mongoose";

interface UserDocument extends Document {
    firstName: string;
    lastname: string;
    email: string;
    phone: string;
    gender: string;
}

const userListSchema = new Schema<UserDocument>(
    {
        firstName: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        gender: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const UsersListModel = models.UsersList || model("UsersList", userListSchema);

export default UsersListModel as Model<UserDocument>;
