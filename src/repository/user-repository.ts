import { inject } from 'aurelia-framework';
import { valueOf } from '../firebase';
import { User } from '../models/user';
import Reference = firebase.database.Reference;

export class UserRepository {
    private readonly users: Reference;

    constructor(@inject('database') database: Reference) {
        this.users = database.child('user');
    }

    async findById(id: string): Promise<User | undefined> {
        return valueOf(this.users.child(id.toString()));
    }
}
