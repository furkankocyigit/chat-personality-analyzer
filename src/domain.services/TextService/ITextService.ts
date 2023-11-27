export interface ITextService {
    addText(message: string): boolean;
    getAllTexts(userName: string): string[] | Promise<string[]>;
    addTextGroup(messages: string[]): boolean;
    clearTexts(): void;
}
