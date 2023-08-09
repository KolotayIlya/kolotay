import { Client } from '@notionhq/client';
import { CreatePageResponse } from "@notionhq/client/build/src/api-endpoints";
import env from '../../env';
import debug from 'debug';

const ll = debug('notionbot::notionConnector');

let notion: Client;
notion = new Client({
    auth: env!.NOTION_TOKEN,
});
export default {
    createTask: function (title: string, tgAuthor: string): Promise<CreatePageResponse> {
        ll('creating task', title, 'from', tgAuthor);
        return notion.pages.create({
            parent: {
                database_id: '296979794bf14ef8b490c4c3635cf1ab'
            },
            properties: {
                "title": {
                    type: "title",
                    title: [
                        {
                            text: {
                                content: title
                            }
                        }
                    ]
                },
                "TGAuthor": {
                    type: "rich_text",
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: tgAuthor
                            }
                        }
                    ]
                }
            }

        });
    },
    convertTaskToUrl: function (task: CreatePageResponse): string {
        return task.id.replace(/-/g, ''); // конвертируем id в рабочий для ссылки
    }
};
