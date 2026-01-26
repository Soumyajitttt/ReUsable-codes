import { Client, Account, ID } from "appwrite";
import conf from ".conf/conf.js";

// const client = new Client()
//     .setEndpoint(conf.appwriteUrl) // Your API Endpoint
//     .setProject(conf.appwriteProjectId); // Your project ID
// const account = new Account(client);

// const user = await account.create({
//     userId:  ID.unique(), 
//     email: 'email@example.com', 
//     password: 'password'
// });


export class AuthService {
    client=new Client();
    account 

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);
    }

    async createAccount(email, password, name){
        try {
            const userAccount = await this.account.create({
                userId:  ID.unique(), 
                email: email, 
                password: password,
                name: name
            });
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    }

    async login(email, password){
        try {
            const session = await this.account.createEmailSession(email, password);
            return session;
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            console.error("Error getting current user:", error);
            throw error;
        }

        return null;
    }

    async logout(){
        try {
            const result = await this.account.deleteSession();
            return result;
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    }
}
 
const authService = new AuthService();

export default authService;  
