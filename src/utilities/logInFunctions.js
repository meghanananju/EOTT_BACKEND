
const user = require("../models/user/user");
const { hashPassword } = require("./password");
// Find user by gid
const findEmailFromUser = async (email) => {
    return await user.findOne({
      where: { email: email, isDelete: 0 },
    });
  };
  module.exports = {
    
    findEmailFromUser
   
  };