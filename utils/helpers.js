module.exports = {
    async validateEmail(email) {
        const regex = /^.+@(?:[\w-]+\.)+\w+$/;
        const bool = await regex.test(email);
        return bool;
    }
}