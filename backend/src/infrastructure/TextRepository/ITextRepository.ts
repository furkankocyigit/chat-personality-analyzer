export interface ITextRepository {
    addSingleText(text: string): boolean;
    addMultipleTexts(texts: string[]): boolean;
    getAllTexts(username: string): string[] | Promise<string[]>;
    clearTexts(): void;
}
