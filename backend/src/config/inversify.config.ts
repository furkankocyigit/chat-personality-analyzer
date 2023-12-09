import 'reflect-metadata';
import 'dotenv/config';
import { Container } from 'inversify';
import OpenAI from 'openai';
import { IgApiClient } from 'instagram-private-api';

import { CLIENTS, CONSTANTS, CONTROLLERS, REPOSITORIES, SERVICES } from './identifiers';
import {
    ITextService,
    TextService,
    EvaluationService,
    IEvaluationService,
    IAuthenticationService,
    AuthenticationServiceInstgram,
} from '../domain.services';
import {
    ITextRepository,
    IEvaluationModel,
    OpenAIEvaluationModel,
    InstagramTextRepository,
    MemoryTextSaver,
} from '../infrastructure';
import {
    ITextController,
    TextController,
    EvaluationController,
    IEvaluationController,
    IAuthenticationController,
    AuthenticationController,
} from '../application/controllers';
import { EnvExporter } from '../utils';

const OPENAI_API_KEY = EnvExporter.export('OPENAI_API_KEY');
const IG_USERNAME = EnvExporter.export('IG_USERNAME');
const IG_PASSWORD = EnvExporter.export('IG_PASSWORD');

const DIcontainer = new Container();

DIcontainer.bind<string>(CONSTANTS.IG_USERNAME).toConstantValue(IG_USERNAME);
DIcontainer.bind<string>(CONSTANTS.IG_PASSWORD).toConstantValue(IG_PASSWORD);
DIcontainer.bind<OpenAI>(CLIENTS.OpenAIClient).toConstantValue(new OpenAI({ apiKey: OPENAI_API_KEY }));
DIcontainer.bind<IgApiClient>(CLIENTS.IgApiClient).toConstantValue(new IgApiClient());

DIcontainer.bind<ITextRepository>(REPOSITORIES.MemoryTextSaver).to(MemoryTextSaver).inSingletonScope();
DIcontainer.bind<ITextService>(SERVICES.TextService).to(TextService).inSingletonScope();
DIcontainer.bind<ITextController>(CONTROLLERS.TextController).to(TextController).inSingletonScope();

DIcontainer.bind<IEvaluationModel>(REPOSITORIES.OpenAIEvaluationModel).to(OpenAIEvaluationModel).inSingletonScope();
DIcontainer.bind<IEvaluationService>(SERVICES.EvaluationService).to(EvaluationService).inSingletonScope();
DIcontainer.bind<IEvaluationController>(CONTROLLERS.EvaluationController).to(EvaluationController).inSingletonScope();

DIcontainer.bind<IAuthenticationService>(SERVICES.AuthenticationService).to(AuthenticationServiceInstgram);
DIcontainer.bind<IAuthenticationController>(CONTROLLERS.AuthenticationController).to(AuthenticationController);

DIcontainer.bind<IUserRepository>(REPOSITORIES.UserRepository).to(UserRepositoryInstagram);
DIcontainer.bind<IUserService>(SERVICES.UserService).to(UserService);
DIcontainer.bind<IUserController>(CONTROLLERS.UserController).to(UserController);
export { DIcontainer };
