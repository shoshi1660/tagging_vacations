const dal = require("../data-access-layer/dal");

async function getAllVacationsAsync(id) {
    return await dal.executeQueryAsync(
        `SELECT * FROM following 
        RIGHT JOIN vacations
        on following.vacationId = vacations.vacationId AND following.id=${id}
        ORDER by  following.id = ${id}  DESC`);
}

async function addFollowToFollowing(newFollow) {
    return await dal.executeQueryAsync("INSERT INTO following values (DEFAULT,?,?)",
        [newFollow.id, newFollow.vacationId]);
}

async function deleteFollowToFollowing(followingId) {
    return await dal.executeQueryAsync(`DELETE FROM following WHERE followingId=${followingId}`);
}
// vacationId=?,description=?,destination=?,Image=?,startDate=?,endDate=?,price=?,amountFollowers=?
async function addFollowVacation(vacationId) {
    return await dal.executeQueryAsync(`UPDATE vacations SET amountFollowers=amountFollowers+1 WHERE vacationId=${vacationId}`);
}

async function subtractFollowVacation(vacationId) {
    return await dal.executeQueryAsync(`UPDATE vacations SET amountFollowers=amountFollowers-1 WHERE vacationId=${vacationId}`);
}

module.exports = {
    getAllVacationsAsync, addFollowToFollowing, deleteFollowToFollowing, addFollowVacation, subtractFollowVacation
}