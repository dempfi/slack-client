"use strict";
const _ = require('lodash');
function transformer(result, value, key) {
    switch (key) {
        case 'id':
            result.handler = `<@${value}>`;
            break;
        case 'profile':
            result.email = value.email;
            result.phone = value.phone || '';
            result.title = value.title || '';
            result.skype = value.skype || '';
            result.firstName = value.first_name;
            result.lastName = value.last_name;
            break;
        case 'real_name':
            result.fullName = value;
            break;
        default:
            result[_.camelCase(key)] = value;
            break;
    }
    return result;
}
function default_1(user) {
    return _.reduce(user, transformer, {});
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb252ZXJ0ZXJzL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksQ0FBQyxXQUFNLFFBQ25CLENBQUMsQ0FEMEI7QUFHM0IscUJBQXNCLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRztJQUN0QyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1osS0FBSyxJQUFJO1lBQ1AsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLEtBQUssR0FBRyxDQUFBO1lBQzlCLEtBQUssQ0FBQTtRQUVQLEtBQUssU0FBUztZQUNaLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQTtZQUMxQixNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFBO1lBQ2hDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUE7WUFDaEMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQTtZQUNoQyxNQUFNLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUE7WUFDbkMsTUFBTSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFBO1lBQ2pDLEtBQUssQ0FBQTtRQUVQLEtBQUssV0FBVztZQUNkLE1BQU0sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO1lBQ3ZCLEtBQUssQ0FBQTtRQUVQO1lBQ0UsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUE7WUFDaEMsS0FBSyxDQUFBO0lBQ1QsQ0FBQztJQUNELE1BQU0sQ0FBQyxNQUFNLENBQUE7QUFDZixDQUFDO0FBRUQsbUJBQXlCLElBQVM7SUFDaEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUN4QyxDQUFDO0FBRkQ7MkJBRUMsQ0FBQSJ9