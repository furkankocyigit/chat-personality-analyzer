import { inject, injectable } from 'inversify';
import { ITextRepository } from './ITextRepository';
import { CLIENTS } from '../../config/identifiers';
import { IgApiClient } from 'instagram-private-api';
import { ErrorWithCode, StatusCode } from '../../utils';

@injectable()
export class InstagramTextRepository implements ITextRepository {
    private ig: IgApiClient;
    constructor(@inject(CLIENTS.IgApiClient) ig: IgApiClient) {
        this.ig = ig;
    }

    async getAllTexts(userName: string): Promise<string[]> {
        const userId = await this.ig.user.getIdByUsername(userName);
        const threadID = await this.getUserMessageThreadID(userName);

        const texts = await this.getUsersAllMessages(threadID, userId);

        return texts;
    }
    async getUserMessageThreadID(userName: string): Promise<string> {
        const threads = await this.ig.feed.directInbox().items();

        for (const thread of threads) {
            const participants = thread.users.map((user) => user.username.toLowerCase());
            if (participants.includes(userName)) return thread.thread_id;
        }

        throw new ErrorWithCode('No message Thread found for user: ' + userName, StatusCode.NOT_FOUND);
    }

    async getUsersAllMessages(threadId: string, userID: number): Promise<string[]> {
        let textMessages: string[] = [];
        let cursor = '';
        do {
            const feedThread = this.ig.feed.directThread({ thread_id: threadId, oldest_cursor: cursor });

            const items = await feedThread.items();
            if (items.length === 0) break;

            items.forEach((item) => {
                if (item.item_type === 'text' && item.text !== undefined && item.user_id === userID)
                    textMessages.push(item.text);
            });

            cursor = feedThread.cursor;
        } while (cursor !== '');

        textMessages = textMessages.reverse();
        return textMessages;
    }

    addSingleText(text: string): boolean {
        throw new Error('Adding messages to chat is not supported for now');
    }
    addMultipleTexts(texts: string[]): boolean {
        throw new Error('Adding messages to chat is not supported for now');
    }
    clearTexts(): void {
        throw new Error('Clearing messages from chat is not supported for now');
    }
}
