import { Document, model, Model, models, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
    resetToken: string;
    comparePassword(password: string): Promise<boolean>;
}
interface Methods {
    comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument, Methods>(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        resetToken: { type: String },
    },
    {
        timestamps: true,
    }
);

// hash the password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        console.error(error);
        throw error;
    }
});
// Compate password method
userSchema.methods.comparePassword = async function (password: string) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const UserModel = models.User || model("User", userSchema);

export default UserModel as Model<UserDocument, Methods>;
