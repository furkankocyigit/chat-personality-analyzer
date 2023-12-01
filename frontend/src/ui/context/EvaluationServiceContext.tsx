import { PropsWithChildren, createContext, useContext } from 'react';
import { EvaluationService, IEvaluationService } from '../../services/EvaluationService';
import { useHttpClient } from './HttpClientContext';
import { EvaluationRepository, IEvaluationRepository } from '@/infrastructure/repository/EvaluationRepository';

const baseURL = 'http://localhost:3001/evaluate/';

export interface IEvaluationServiceContext {
    evaluationService: IEvaluationService;
}

const EvaluationServiceContext = createContext<IEvaluationServiceContext>({} as IEvaluationServiceContext);

export const EvaluationServiceProvider = ({ children }: PropsWithChildren) => {
    const { httpClient } = useHttpClient();
    const evaluationRepository: IEvaluationRepository = new EvaluationRepository(httpClient, baseURL);
    const evaluationService: IEvaluationService = new EvaluationService(evaluationRepository);

    const value = { evaluationService };

    return <EvaluationServiceContext.Provider value={value}>{children}</EvaluationServiceContext.Provider>;
};

export const useEvaluationService = () => useContext(EvaluationServiceContext);
