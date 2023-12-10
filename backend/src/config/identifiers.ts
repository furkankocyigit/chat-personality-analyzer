export const REPOSITORIES = {
    MemoryTextSaver: Symbol.for('MemoryTextSaver'),
    OpenAIEvaluationModel: Symbol.for('OpenAIEvaluationModel'),
    UserRepository: Symbol.for('UserRepository'),
};
export const SERVICES = {
    TextService: Symbol.for('TextService'),
    EvaluationService: Symbol.for('EvaluationService'),
    AuthenticationService: Symbol.for('AuthenticationService'),
    UserService: Symbol.for('UserService'),
};
export const CONTROLLERS = {
    TextController: Symbol.for('TextController'),
    EvaluationController: Symbol.for('EvaluationController'),
    AuthenticationController: Symbol.for('AuthenticationController'),
    UserController: Symbol.for('UserController'),
};

export const CLIENTS = {
    OpenAIClient: Symbol.for('OpenAIClient'),
    IgApiClient: Symbol.for('IgApiClient'),
};

export const CONSTANTS = {
    IG_USERNAME: Symbol.for('IG_USERNAME'),
    IG_PASSWORD: Symbol.for('IG_PASSWORD'),
};
