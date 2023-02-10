const { firstnames, lastnames } = require('./names')

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// repurposed my random name generator.  Gets a random first and last name and creates a username and email
const createRandomUser = () => {
    const first = getRandomArrItem(firstnames)
    const last = getRandomArrItem(lastnames)
    const username = `${first}_${last}`
    const email = `${first}_${last}@email.com`
    return {
        username,
        email
    }
}


module.exports = {
    createRandomUser,
}
