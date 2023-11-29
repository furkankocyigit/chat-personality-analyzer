export const REPOSITORIES = {
    MemoryTextSaver: Symbol.for('MemoryTextSaver'),
    OpenAIEvaluationModel: Symbol.for('OpenAIEvaluationModel'),
};
export const SERVICES = {
    TextService: Symbol.for('TextService'),
    EvaluationService: Symbol.for('EvaluationService'),
};
export const CONTROLLERS = {
    TextController: Symbol.for('TextController'),
    EvaluationController: Symbol.for('EvaluationController'),
};

export const CLIENTS = {
    OpenAIClient: Symbol.for('OpenAIClient'),
    IgApiClient: Symbol.for('IgApiClient'),
};

export const CONSTANTS = {
    IG_USERNAME: Symbol.for('IG_USERNAME'),
    IG_PASSWORD: Symbol.for('IG_PASSWORD'),
};