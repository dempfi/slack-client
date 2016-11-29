import Channel from './types/channel';
import { default as User, PartialUser } from './types/user';
import { default as Message, MessageOptions } from './types/message';
export default class Client {
    private token;
    constructor(token: string);
    private call(method, form?);
    static auth(options: {
        id: string;
        secret: string;
        code: string;
        redirectUri?: string;
    }): Promise<any>;
    user(idOrPartialUser: string | PartialUser): Promise<User>;
    users(filters?: PartialUser): Promise<User[]>;
    channel(channel: string): Promise<Channel>;
    channels(): Promise<Channel[]>;
    group(group: string): Promise<any>;
    groups(): Promise<any>;
    send(channel: string, message: Message, options?: MessageOptions): Promise<any>;
}
