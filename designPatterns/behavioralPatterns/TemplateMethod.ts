// template method pattern

interface ConnectionInfo {
    isValid: boolean;
    role: Role;
}

type Role = 'GameManager' | 'User';

abstract class GameConnector {
    // template method
    public requestConnection(userName:string, password: string): void {
        const decodedPassword = this.decodePassword(password);
        const userId = this.authentication(userName, decodedPassword);
        const role = this.getRole(userId);

        const connectionInfo: ConnectionInfo = {
            isValid: !!userId,
            role,
        };
        this.connection(connectionInfo);
    }

    // steps
    protected decodePassword(password: string): string {
        const decodedPassword = password.replace(/\d/gm, '');
        return decodedPassword;
    };
    protected abstract authentication(userName: string, decodedPassword: string): string;
    protected abstract getRole(userId: string): Role;
    protected abstract connection(connectionInfo: ConnectionInfo): void;
}


class DefaultGameConnector extends GameConnector {
    constructor() {
        super();
    }

    authentication(userName: string, decodedPassword: string): string {
        console.log('matching userName and password...');

        if (userName === 'user' && decodedPassword === 'qwe') {
            return 'firstUserId';
        }

        return null;
    }

    getRole(userId: string): Role {
        if (userId === 'firstUserId') {
            return 'User';
        }

        return null;
    }

    connection(connectionInfo: ConnectionInfo) {
        if (!connectionInfo.isValid) {
            console.error('your connection request is invalid please check your infos');
            return;
        }

        console.log('your connection request is valid!');
        console.log('your role is: ', connectionInfo.role);
    }
}

class ManagerConnector extends GameConnector {
    constructor() {
        super();
    }

    authentication(userName: string, decodedPassword: string): string {
        if (userName === 'eloy' && decodedPassword === 'asd') {
            return 'managerUserId';
        }

        return null;
    }

    protected getRole(userId: string): Role {
        if (userId === 'managerUserId') {
            return 'GameManager';
        }
        return null
    }

    protected connection(connectionInfo: ConnectionInfo): void {
        if (!connectionInfo.isValid) {
            console.error('you are not game manager!');
            return;
        }

        console.log('hello GM!');
    }
}

const defaultConnector = new DefaultGameConnector();
// wrong connection
defaultConnector.requestConnection('user', '123qqq');

// right connection
defaultConnector.requestConnection('user', '123qwe');

const managerConnector = new ManagerConnector();
// wrong connection
managerConnector.requestConnection('eloy', '123123qwe');

// right connection
managerConnector.requestConnection('eloy', '123asd');
