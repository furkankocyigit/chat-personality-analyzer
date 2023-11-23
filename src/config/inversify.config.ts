import 'reflect-metadata';
import 'dotenv/config';
import { Container } from 'inversify';
import { CLIENTS, CONTROLLERS, REPOSITORIES, SERVICES } from './identifiers';
import { ITextService, TextService } from '../domain.services/TextService';
import { ITextSaver, MemoryTextSaver } from '../infrastructure/MemoryTextSaver';
import { ITextController, TextController } from '../application/controllers/TextController';
import { EnvExporter } from '../utils/EnvExporter';
import OpenAI from 'openai';
import { IEvaluationModel, OpenAIEvaluationModel } from '../infrastructure/OpenAIEvaluationModel';
import { EvaluationService, IEvaluationService } from '../domain.services/EvaluationService';
import { EvaluationController, IEvaluationController } from '../application/controllers/EvaluationController';

const OPENAI_API_KEY = EnvExporter.export('OPENAI_API_KEY');
const DIcontainer = new Container();

DIcontainer.bind<OpenAI>(CLIENTS.OpenAIClient).toConstantValue(new OpenAI({ apiKey: OPENAI_API_KEY }));

DIcontainer.bind<ITextSaver>(REPOSITORIES.MemoryTextSaver).to(MemoryTextSaver).inSingletonScope();
DIcontainer.bind<ITextService>(SERVICES.TextService).to(TextService).inSingletonScope();
DIcontainer.bind<ITextController>(CONTROLLERS.TextController).to(TextController).inSingletonScope();

DIcontainer.bind<IEvaluationModel>(REPOSITORIES.OpenAIEvaluationModel).to(OpenAIEvaluationModel).inSingletonScope();
DIcontainer.bind<IEvaluationService>(SERVICES.EvaluationService).to(EvaluationService).inSingletonScope();
DIcontainer.bind<IEvaluationController>(CONTROLLERS.EvaluationController).to(EvaluationController).inSingletonScope();

export { DIcontainer };
