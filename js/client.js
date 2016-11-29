"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const _ = require('lodash');
const request = require('request-promise-native');
const converters = require('./converters');
class ClientError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'SlackClientError';
    }
}
class APIError extends ClientError {
    constructor(message) {
        super(`Slack API returned error code ${message}.`);
    }
}
class NotFound extends ClientError {
    constructor(type, args) {
        super(`${_.capitalize(type)} isn't found with params: ${JSON.stringify(args)}`);
    }
}
class Client {
    constructor(token) {
        this.token = token;
    }
    call(method, form = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = `https://slack.com/api/${method}?token=${this.token}`;
            form = _.mapValues(form, v => _.isObject(v) ? JSON.stringify(v) : v);
            try {
                const response = yield request.post({ uri, json: true, form });
                if (!response.ok)
                    throw new APIError(response.error);
                return response;
            }
            catch (e) {
                throw e;
            }
        });
    }
    static auth(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = `https://slack.com/api/oauth.access`;
            const form = {
                client_id: options.id,
                client_secret: options.secret,
                code: options.code,
                redirect_uri: options.redirectUri
            };
            try {
                const response = yield request.post({ uri, json: true, form });
                return converters.camel(response);
            }
            catch (e) {
                throw e;
            }
        });
    }
    user(idOrPartialUser) {
        return __awaiter(this, void 0, void 0, function* () {
            if (_.isString(idOrPartialUser)) {
                try {
                    const response = yield this.call('users.info', { user: idOrPartialUser });
                    return converters.user(response.user);
                }
                catch (e) {
                    throw e;
                }
            }
            try {
                const users = yield this.users();
                const user = _.find(users, idOrPartialUser);
                if (user)
                    return user;
                throw new NotFound('user', idOrPartialUser);
            }
            catch (e) {
                throw e;
            }
        });
    }
    users(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.call('users.list');
                let users = response.members.map(converters.user);
                return filters ? _.filter(users, filters) : users;
            }
            catch (e) {
                throw e;
            }
        });
    }
    // TODO
    channel(channel) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.call('channels.info', { channel });
                return converters.camel(response.channel);
            }
            catch (e) {
                throw e;
            }
        });
    }
    // TODO
    channels() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.call('channels.list');
                return response.channels.map(converters.camel);
            }
            catch (e) {
                throw e;
            }
        });
    }
    // TODO
    group(group) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.call('groups.info', { group });
                return response.channels.map(converters.camel);
            }
            catch (e) {
                throw e;
            }
        });
    }
    // TODO
    groups() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.call('groups.list');
                return response.groups.map(converters.camel);
            }
            catch (e) {
                throw e;
            }
        });
    }
    send(channel, message, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const opts = _.merge({ channel }, message, { asUser: true }, options || {});
                const response = yield this.call('chat.postMessage', converters.snake(opts));
                return converters.camel(response.message);
            }
            catch (e) {
                throw e;
            }
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFZLENBQUMsV0FBTSxRQUNuQixDQUFDLENBRDBCO0FBQzNCLE1BQVksT0FBTyxXQUFNLHdCQUN6QixDQUFDLENBRGdEO0FBQ2pELE1BQVksVUFBVSxXQUFNLGNBRTVCLENBQUMsQ0FGeUM7QUFNMUMsMEJBQTBCLEtBQUs7SUFDN0IsWUFBb0IsT0FBZTtRQUNqQyxPQUFPLENBQUE7UUFEVyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBRWpDLElBQUksQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLENBQUE7SUFDaEMsQ0FBQztBQUNILENBQUM7QUFFRCx1QkFBdUIsV0FBVztJQUNoQyxZQUFhLE9BQWU7UUFDMUIsTUFBTSxpQ0FBaUMsT0FBTyxHQUFHLENBQUMsQ0FBQTtJQUNwRCxDQUFDO0FBQ0gsQ0FBQztBQUVELHVCQUF1QixXQUFXO0lBQ2hDLFlBQWEsSUFBWSxFQUFFLElBQVM7UUFDbEMsTUFBTSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLDZCQUE2QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUNqRixDQUFDO0FBQ0gsQ0FBQztBQUVEO0lBQ0UsWUFBcUIsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7SUFBRyxDQUFDO0lBRXhCLElBQUksQ0FBRSxNQUFNLEVBQUUsSUFBSSxHQUFRLEVBQUU7O1lBQ3hDLE1BQU0sR0FBRyxHQUFHLHlCQUF5QixNQUFNLFVBQVUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQ2pFLElBQUksR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQ3BFLElBQUksQ0FBQztnQkFDSCxNQUFNLFFBQVEsR0FBRyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO2dCQUM5RCxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7b0JBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ3BELE1BQU0sQ0FBQyxRQUFRLENBQUE7WUFDakIsQ0FBRTtZQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsTUFBTSxDQUFDLENBQUE7WUFDVCxDQUFDO1FBQ0gsQ0FBQztLQUFBO0lBR0QsT0FBYSxJQUFJLENBQUUsT0FBeUU7O1lBQzFGLE1BQU0sR0FBRyxHQUFHLG9DQUFvQyxDQUFBO1lBQ2hELE1BQU0sSUFBSSxHQUFHO2dCQUNYLFNBQVMsRUFBRSxPQUFPLENBQUMsRUFBRTtnQkFDckIsYUFBYSxFQUFFLE9BQU8sQ0FBQyxNQUFNO2dCQUM3QixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7Z0JBQ2xCLFlBQVksRUFBRSxPQUFPLENBQUMsV0FBVzthQUNsQyxDQUFBO1lBQ0QsSUFBSSxDQUFDO2dCQUNILE1BQU0sUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7Z0JBQzlELE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ25DLENBQUU7WUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNYLE1BQU0sQ0FBQyxDQUFBO1lBQ1QsQ0FBQztRQUNILENBQUM7S0FBQTtJQUVLLElBQUksQ0FBRSxlQUFxQzs7WUFDL0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQztvQkFDSCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUMsSUFBSSxFQUFFLGVBQWUsRUFBQyxDQUFDLENBQUE7b0JBQ3ZFLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDdkMsQ0FBRTtnQkFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNYLE1BQU0sQ0FBQyxDQUFBO2dCQUNULENBQUM7WUFDSCxDQUFDO1lBQ0QsSUFBSSxDQUFDO2dCQUNILE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO2dCQUNoQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxlQUFlLENBQUMsQ0FBQTtnQkFDM0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUE7Z0JBQ3JCLE1BQU0sSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFBO1lBQzdDLENBQUU7WUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNYLE1BQU0sQ0FBQyxDQUFBO1lBQ1QsQ0FBQztRQUNILENBQUM7S0FBQTtJQUVLLEtBQUssQ0FBRSxPQUFxQjs7WUFDaEMsSUFBSSxDQUFDO2dCQUNILE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtnQkFDOUMsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNqRCxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQTtZQUNuRCxDQUFFO1lBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDWCxNQUFNLENBQUMsQ0FBQTtZQUNULENBQUM7UUFDSCxDQUFDO0tBQUE7SUFFRCxPQUFPO0lBQ0QsT0FBTyxDQUFFLE9BQWU7O1lBQzVCLElBQUksQ0FBQztnQkFDSCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQTtnQkFDNUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzNDLENBQUU7WUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNYLE1BQU0sQ0FBQyxDQUFBO1lBQ1QsQ0FBQztRQUNILENBQUM7S0FBQTtJQUVELE9BQU87SUFDRCxRQUFROztZQUNaLElBQUksQ0FBQztnQkFDSCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7Z0JBQ2pELE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDaEQsQ0FBRTtZQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsTUFBTSxDQUFDLENBQUE7WUFDVCxDQUFDO1FBQ0gsQ0FBQztLQUFBO0lBRUQsT0FBTztJQUNELEtBQUssQ0FBRSxLQUFhOztZQUN4QixJQUFJLENBQUM7Z0JBQ0gsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUE7Z0JBQ3hELE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDaEQsQ0FBRTtZQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsTUFBTSxDQUFDLENBQUE7WUFDVCxDQUFDO1FBQ0gsQ0FBQztLQUFBO0lBRUQsT0FBTztJQUNELE1BQU07O1lBQ1YsSUFBSSxDQUFDO2dCQUNILE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtnQkFDL0MsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUM5QyxDQUFFO1lBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDWCxNQUFNLENBQUMsQ0FBQTtZQUNULENBQUM7UUFDSCxDQUFDO0tBQUE7SUFFSyxJQUFJLENBQUUsT0FBZSxFQUFFLE9BQWdCLEVBQUUsT0FBd0I7O1lBQ3JFLElBQUksQ0FBQztnQkFDSCxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQTtnQkFDdkUsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtnQkFDNUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzNDLENBQUU7WUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNYLE1BQU0sQ0FBQyxDQUFBO1lBQ1QsQ0FBQztRQUNILENBQUM7S0FBQTtBQUNILENBQUM7QUE5R0Q7d0JBOEdDLENBQUEifQ==