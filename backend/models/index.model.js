const usermodel = require("./user.model.js");
const postmodel = require("./post.model.js");
const readmodel = require("./read.model.js");

module.exports = {
    initDatabase : async (req, res, next) => {
        try{
            const result = await usermodel.createUserTable()
            if(!result) throw {message: "could not create user table"}
            const posts = await postmodel.createPostTable();
            if(!posts) throw {message: "could not create post table"}
            const read = await readmodel.createReadTable()
            if(!read) throw {message: "could not create read table"}
        } catch (error) {
             throw {"error": error};
        }
    }
}

