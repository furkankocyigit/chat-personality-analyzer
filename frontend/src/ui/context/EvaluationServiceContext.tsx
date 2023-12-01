import { PropsWithChildren, createContext, useContext } from 'react';
import { EvaluationService, IEvaluationService } from '../../services/EvaluationService';
import { useHttpClient } from './HttpClientContext';
import { EvaluationRepository, IEvaluationRepository } from '@/infrastructure/repository/EvaluationRepository';
import { BACKEND_HOST } from '@/utils/constants';
import { BackenRoute } from '@/infrastructure/BackendRoutes/BackendRoute';

export interface IEvaluationServiceContext {
    evaluationService: IEvaluationService;
}

const EvaluationServiceContext = createContext<IEvaluationServiceContext>({} as IEvaluationServiceContext);

export const EvaluationServiceProvider = ({ children }: PropsWithChildren) => {
    const { httpClient } = useHttpClient();

    const evaluationBaseURL = BACKEND_HOST + BackenRoute.EVALUATE;
    const evaluationRepository: IEvaluationRepository = new EvaluationRepository(httpClient, evaluationBaseURL);

    const evaluationService: IEvaluationService = new EvaluationService(evaluationRepository);

    const value = { evaluationService };

    return <EvaluationServiceContext.Provider value={value}>{children}</EvaluationServiceContext.Provider>;
};

export const useEvaluationService = () => useContext(EvaluationServiceContext);
