const { ObjectId } = require("mongodb");

class loginService {
    constructor(client) {
        this.Login = client.db().collection("Accounts");
    }
    extractContactData(payload) {
        const login = {
            username: payload.username,
            password: payload.username,
        };
        Object.keys(login).forEach(
            (key) => login[key] == undefined && delete login[key]
        );
        return login;
    }

    async register(payload) {
        const login = this.extractContactData(payload);
        const result = await this.Login.findOneAndUpdate(
            login,
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Login.find(filter);
        return await cursor.toArray();
    }

    async findLogin(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i"},
        });
    }
}

module.exports = loginService;