"use strict";
const _ = require('lodash');
function transformer(result, value, key) {
    switch (key) {
        case 'name':
            result.handler = value;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb252ZXJ0ZXJzL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksQ0FBQyxXQUFNLFFBQ25CLENBQUMsQ0FEMEI7QUFHM0IscUJBQXNCLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRztJQUN0QyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1osS0FBSyxNQUFNO1lBQ1QsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7WUFDdEIsS0FBSyxDQUFBO1FBRVAsS0FBSyxTQUFTO1lBQ1osTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFBO1lBQzFCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUE7WUFDaEMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQTtZQUNoQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFBO1lBQ2hDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQTtZQUNuQyxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUE7WUFDakMsS0FBSyxDQUFBO1FBRVAsS0FBSyxXQUFXO1lBQ2QsTUFBTSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUE7WUFDdkIsS0FBSyxDQUFBO1FBRVA7WUFDRSxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQTtZQUNoQyxLQUFLLENBQUE7SUFDVCxDQUFDO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQTtBQUNmLENBQUM7QUFFRCxtQkFBeUIsSUFBUztJQUNoQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQ3hDLENBQUM7QUFGRDsyQkFFQyxDQUFBIn0=