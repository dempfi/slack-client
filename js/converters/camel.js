"use strict";
const _ = require('lodash');
function transformer(result, value, key) {
    if (_.isPlainObject(value))
        value = _.reduce(value, transformer, {});
    if (_.isArray(value))
        value = value.map(camelObject);
    result[_.camelCase(key)] = value;
    return result;
}
function camelObject(object) {
    return _.reduce(object, transformer, {});
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = camelObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FtZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udmVydGVycy9jYW1lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBWSxDQUFDLFdBQU0sUUFFbkIsQ0FBQyxDQUYwQjtBQUUzQixxQkFBc0IsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHO0lBQ3RDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ3BFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUNwRCxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQTtJQUNoQyxNQUFNLENBQUMsTUFBTSxDQUFBO0FBQ2YsQ0FBQztBQUVELHFCQUFxQyxNQUFNO0lBQ3pDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDMUMsQ0FBQztBQUZEOzZCQUVDLENBQUEifQ==