"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@notionhq/client");
const env_1 = __importDefault(require("../../env"));
const debug_1 = __importDefault(require("debug"));
const ll = (0, debug_1.default)('notionbot::notionConnector');
const notion = new client_1.Client({
    auth: env_1.default.NOTION_TOKEN,
});
const taskDB = env_1.default.NOTION_TASK_DB;
exports.default = {
    createTask: function (title, tgAuthor) {
        ll('creating task', title, 'from', tgAuthor);
        return notion.pages.create({
            parent: {
                database_id: taskDB
            },
            properties: {
      "Обезьянопонятная задача": {
        title: [
          {
            type: "text",
            text: {
              content: title
            }
          }
        ]
      },
      "TGAuther": {
        "select": {
          "name": "Телеграмм"
        }
      }
            }
        });
    },
    convertTaskToUrl: function (task) {
        return task.id.replace(/-/g, ''); // конвертируем id в рабочий для ссылки
    }
};
//# sourceMappingURL=connector.js.map
