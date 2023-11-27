import 'reflect-metadata';
import 'dotenv/config';
import { Container } from 'inversify';
import { CLIENTS, CONSTANTS, CONTROLLERS, REPOSITORIES, SERVICES } from './identifiers';
import { ITextService, TextService } from '../domain.services/TextService';
import { ITextRepository, MemoryTextSaver } from '../infrastructure/MemoryTextSaver';
import {
    ITextController,
    TextController,
    EvaluationController,
    IEvaluationController,
} from '../application/controllers';
import { EnvExporter } from '../utils/EnvExporter';
import OpenAI from 'openai';
import { IEvaluationModel, OpenAIEvaluationModel } from '../infrastructure/OpenAIEvaluationModel';
import { EvaluationService, IEvaluationService } from '../domain.services/EvaluationService';
import { IgApiClient } from 'instagram-private-api';
import { InstagramTextRepository } from '../infrastructure/InstgramTextRepository';

const OPENAI_API_KEY = EnvExporter.export('OPENAI_API_KEY');
const IG_USERNAME = EnvExporter.export('IG_USERNAME');
const IG_PASSWORD = EnvExporter.export('IG_PASSWORD');
const DIcontainer = new Container();

DIcontainer.bind<string>(CONSTANTS.IG_USERNAME).toConstantValue(IG_USERNAME);
DIcontainer.bind<string>(CONSTANTS.IG_PASSWORD).toConstantValue(IG_PASSWORD);
DIcontainer.bind<OpenAI>(CLIENTS.OpenAIClient).toConstantValue(new OpenAI({ apiKey: OPENAI_API_KEY }));
DIcontainer.bind<IgApiClient>(CLIENTS.IgApiClient).toConstantValue(new IgApiClient());

DIcontainer.bind<ITextRepository>(REPOSITORIES.MemoryTextSaver).to(InstagramTextRepository).inSingletonScope();
DIcontainer.bind<ITextService>(SERVICES.TextService).to(TextService).inSingletonScope();
DIcontainer.bind<ITextController>(CONTROLLERS.TextController).to(TextController).inSingletonScope();

DIcontainer.bind<IEvaluationModel>(REPOSITORIES.OpenAIEvaluationModel).to(OpenAIEvaluationModel).inSingletonScope();
DIcontainer.bind<IEvaluationService>(SERVICES.EvaluationService).to(EvaluationService).inSingletonScope();
DIcontainer.bind<IEvaluationController>(CONTROLLERS.EvaluationController).to(EvaluationController).inSingletonScope();

export { DIcontainer };
