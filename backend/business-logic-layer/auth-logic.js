const jwt = require("jsonwebtoken");
const dal = require("../data-access-layer/dal");

async function loginAsync(credentials) {
    const user = await dal.executeQueryAsync(
        `
            select * from users 
            where userName='${credentials.userName}'
            and password='${credentials.password}'
        `
    );
    if (!user || user.length<1) return null;
    delete user[0].password;
    // user.token = jwt.sign({ user }, config.jwtKey, { expiresIn: "5h" });

    user[0].token = jwt.sign({user:user[0]} , "zot hahizdamnut lenasot et jey dablyou tea", { expiresIn: "5 minutes" });
    return user[0];
}

module.exports = {
  //  isUsernameTaken,
  //   registerAsync,
    loginAsync
};