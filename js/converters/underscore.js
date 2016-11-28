"use strict";
const _ = require('lodash');
function transformer(result, value, key) {
    if (_.isPlainObject(value))
        value = _.reduce(value, transformer, {});
    if (_.isArray(value))
        value = value.map(snakeObject);
    result[_.snakeCase(key)] = value;
    return result;
}
function snakeObject(object) {
    return _.reduce(object, transformer, {});
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = snakeObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5kZXJzY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb252ZXJ0ZXJzL3VuZGVyc2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksQ0FBQyxXQUFNLFFBRW5CLENBQUMsQ0FGMEI7QUFFM0IscUJBQXNCLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRztJQUN0QyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUNwRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDcEQsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUE7SUFDaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQTtBQUNmLENBQUM7QUFFRCxxQkFBb0MsTUFBTTtJQUN4QyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQzFDLENBQUM7QUFGRDs2QkFFQyxDQUFBIn0=