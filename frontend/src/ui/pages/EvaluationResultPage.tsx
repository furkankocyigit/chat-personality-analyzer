import { useCallback, useEffect, useState } from 'react';
import { useEvaluationService } from '../context';
import { PersonalityEvaluation } from '@/domain/PersonalityEvaluation';
import { EvaluationBarChart } from '../components/EvaluationBarChart';

export function EvaluationResult({ username }: { username: string }) {
    const { evaluationService } = useEvaluationService();
    const [personalityEvaluation, setpersonalityEvaluation] = useState<PersonalityEvaluation>();

    const getEvaluation = useCallback(async () => {
        try {
            const evaluation = await evaluationService.getEvaluationForUser(username);
            if (!evaluation) {
                throw new Error('Evaluation could not be found for user: ' + username + '.');
            }
            setpersonalityEvaluation(evaluation);
        } catch (err) {
            console.log(err);
        }
    }, [evaluationService, setpersonalityEvaluation, username]);

    useEffect(() => {
        getEvaluation();
    }, [getEvaluation]);

    const evaluationData = personalityEvaluation?.personalities.map((personality) => {
        return {
            personality: personality.personality,
            score: personality.score,
        };
    });

    if (!evaluationData || !personalityEvaluation?.evaluationDescriptions) {
        return <div> No evaluation found </div>;
    }
    return (
        <EvaluationBarChart
            evaluationData={evaluationData}
            evaluationDescription={personalityEvaluation?.evaluationDescriptions}
        />
    );
}
