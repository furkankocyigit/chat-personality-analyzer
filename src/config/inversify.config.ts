import 'reflect-metadata';
import { Container } from 'inversify';
import { CONTROLLERS, REPOSITORIES, SERVICES } from './identifiers';
import { ITextService, TextService } from '../domain.services/TextService';
import { ITextSaver, MemoryTextSaver } from '../infrastructure/MemoryTextSaver';
import { ITextController, TextController } from '../application/controllers/TextController';

const DIcontainer = new Container();

DIcontainer.bind<ITextSaver>(REPOSITORIES.MemoryTextSaver).to(MemoryTextSaver).inSingletonScope();
DIcontainer.bind<ITextService>(SERVICES.TextService).to(TextService).inSingletonScope();
DIcontainer.bind<ITextController>(CONTROLLERS.TextController).to(TextController).inSingletonScope();

export { DIcontainer };
