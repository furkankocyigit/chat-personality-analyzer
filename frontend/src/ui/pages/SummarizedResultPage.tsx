import { PersonalityEvaluation } from '@/domain/PersonalityEvaluation';
import { useEvaluationService } from '../context';
import { useCallback, useEffect, useState } from 'react';
import { EvaluationRadarChart } from '../components/EvaluationRadarChart';

export function SummarizedResultPage({ username }: { username: string }) {
    const { evaluationService } = useEvaluationService();
    const [personalityEvaluation, setpersonalityEvaluation] = useState<PersonalityEvaluation>();

    const getEvaluation = useCallback(async () => {
        try {
            const evaluation = await evaluationService.getSummarizedEvaluationForUser(username);
            setpersonalityEvaluation(evaluation);
        } catch (err) {
            console.log(err);
        }
    }, [evaluationService, setpersonalityEvaluation, username]);

    useEffect(() => {
        getEvaluation();
    }, [getEvaluation]);

    if (personalityEvaluation === undefined) {
        return <div>Loading...</div>; // Display a loading indicator while fetching data
    }

    if (
        !personalityEvaluation ||
        !personalityEvaluation.personalities ||
        !personalityEvaluation.evaluationDescriptions
    ) {
        return <div>No evaluation found</div>;
    }

    const evaluationData = personalityEvaluation.personalities.map((personality) => ({
        personality: personality.personality,
        score: personality.score,
    }));
    return (
        <EvaluationRadarChart
            evaluationData={evaluationData}
            evaluationDescription={personalityEvaluation?.evaluationDescriptions}
        />
    );
}
