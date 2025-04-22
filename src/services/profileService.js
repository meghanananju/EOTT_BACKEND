const { logger } = require("../logs/logger");
const { configurations } = require("../config/config");
const sequelize = require("../db/connect");
const user = require("../models/user/user");
const message = configurations.Messages.profile;

const Profile = async (userName) => {
    console.log(userName);

    if (!userName) {
        return {
            status: 0,
            data: message.noUsername
        };
    }

    try {
        const findUser = await user.findOne({
            where: { userName: userName }
        });

        if (!findUser) {
            return {
                status: 0,
                data: message.userNotFound
            };
        }

        return {
            status: 1,
            data: findUser
        };

    } catch (error) {
        logger.error("Error from profileService: ", error);
        return {
            status: 500,
            data: message.Error
        };
    }
};



module.exports = {
    Profile
};
