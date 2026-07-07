export class TokenManager {

    async save(token) {
        localStorage.setItem("@academy:token", token)
    }
}