const dal = require("../data-access-layer/dal");

async function addUserAsync(newUser) {
    return await dal.executeQueryAsync("insert into `users` values (DEFAULT,?,?,?,?,DEFAULT)",
        [newUser.firstName, newUser.lastName, newUser.userName, newUser.password]
    );
}

async function getAllUserAsync() {
    return await dal.executeQueryAsync("select * from users");
}

async function getAllTheFollows(){
    return await dal.executeQueryAsync("SELECT * FROM following")
}


module.exports = {
    addUserAsync, getAllUserAsync,getAllTheFollows
}