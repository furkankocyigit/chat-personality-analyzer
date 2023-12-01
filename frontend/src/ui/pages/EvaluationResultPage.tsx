import { useCallback, useEffect, useState } from 'react';
import { useEvaluationService } from '../context';
import { PersonalityEvaluation } from '@/domain/PersonalityEvaluation';

export function EvaluationResult() {
    const { evaluationService } = useEvaluationService();
    const [personalityEvaluation, setpersonalityEvaluation] = useState<PersonalityEvaluation>();

    const getEvaluation = useCallback(async () => {
        try {
            const evaluation = await evaluationService.getEvaluationForUser('dummyUser');
            setpersonalityEvaluation(evaluation);
        } catch (err) {
            console.log(err);
        }
    }, [evaluationService, setpersonalityEvaluation]);
    useEffect(() => {
        getEvaluation();
    }, [getEvaluation]);

    //TODO: implement bar chart to display personality evaluation
    return (
        <div>
            <h1>
                {personalityEvaluation?.personalities.map((personality, index) => {
                    return (
                        <div key={index}>
                            <h2>{personality.personality}</h2>
                            <h3>{personality.score}</h3>
                        </div>
                    );
                })}
            </h1>
            <h1>
                <div>
                    <h2>Evaluation Description: {personalityEvaluation?.evaluationDescriptions}</h2>
                </div>
            </h1>
        </div>
    );
}
