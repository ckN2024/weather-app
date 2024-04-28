import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },

    firstName: {
      type: String,
      required: [true, "Firstname is required"],
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "email is required"],
    },

    phoneNumber: {
      countryCode: {
        type: String,
        required: [true, "Country code is required"],
        trim: true,
      },
      number: {
        type: String,
        required: [true, "10 digit phone number is required"],
        trim: true,
        maxlength: [10, "Phone number must be 10 digits"],
        minlength: [10, "Phone number must be 10 digits"],
      },
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationCode: String,

    verificationCodeGenerationTime: Date,

    favouritePlaces: {
        type: [String]
    },

    isNotificationOn: {
        type: Boolean,
        default: false
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema)

export default User;
