const roleType = require("../models/user/roleType");
const { configurations } = require("../config/config");
const { logger } = require("../logs/logger");
const sequelize = require("../db/connect");
const io = require("../bin/www");
const user = require("../models/user/user");
const {
    findRoleTypeId,
    findEmail,
    findUser,
    hashedPassword,
    userValidation,
    fetchUsersData,
} = require("../utilities/signupFunctions");
const usr = require("../models/user/user");

const addUserService = async (

    email,
    roleTypeId,
    userName,
    createdBy
) => {
    // Check if any required parameter is missing
    if (!email || !roleTypeId || !createdBy) {
        return {
            status: 0,
            data: configurations.Messages.signUp.provideSignUpDetails,
        };
    }
    try {


        // Check if user with given email already exists
        const validateUser = await userValidation(email);
        if (validateUser === true) {
            return {
                status: 0,
                data: configurations.Messages.signUp.userAlreadyExists,
            };
        }

        // Hash the password
        const hashedPasswordValue = await hashedPassword("default@123");
        ;// Create a new user
        const newUser = await user.create({
            userName: userName || "",
            email: email,
            roleTypeId: roleTypeId,
            password: hashedPasswordValue,
            createdBy: createdBy,
        });


        return {
            status: 1,
            data: "User added successfully",
            // userObj: newUser, //forTesting
        };
    } catch (error) {
        logger.error(error.stack);
        return {
            status: 0,
            data: configurations.Messages.signUp.cantSignUp,
        };
    }
};
module.exports = {

    addUserService,

};
