const dal = require("../data-access-layer/dal");

async function getAllVacationsAsync() {
    return await dal.executeQueryAsync("select * from vacations");
}

async function getVacationByIdAsync(vacationId) {
    return await dal.executeQueryAsync(`SELECT * FROM vacations WHERE vacationId = ${vacationId}`);
}

async function getVacationWhereFollow() {
    return await dal.executeQueryAsync(`SELECT vacationId,amountFollowers,destination FROM vacations WHERE amountFollowers>0`)
}

async function addVacation(newVacation) {
    return await dal.executeQueryAsync("INSERT INTO vacations values (DEFAULT,?,?,?,?,?,?,DEFAULT)",
        [newVacation.description, newVacation.destination, newVacation.Image, newVacation.startDate, newVacation.endDate, newVacation.price]);
}

async function changeVacation(vacation, id) {
    return await dal.executeQueryAsync(`UPDATE vacations SET description=?,destination=?,Image=?,startDate=?,endDate=?,price=? WHERE vacationId = ${id}`,
        [vacation.description, vacation.destination, vacation.Image, vacation.startDate, vacation.endDate, vacation.price]
    );
}

async function deleteVacation(id) {
    dal.executeQueryAsync(`DELETE FROM following WHERE vacationId = ${id}`);
    return await  dal.executeQueryAsync(`DELETE FROM vacations WHERE vacationId = ${id}`);
}


module.exports = {
    getAllVacationsAsync, addVacation, changeVacation, deleteVacation, getVacationByIdAsync, getVacationWhereFollow
}