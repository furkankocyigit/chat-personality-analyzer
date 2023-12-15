import { useCallback, useEffect, useState } from 'react';
import { useEvaluationService } from '../context';
import { PersonalityEvaluation } from '@/domain/PersonalityEvaluation';
import { EvaluationBarChart } from '../components/EvaluationBarChart';
import { CircularProgress } from '@mui/material';

export function EvaluationResult({ username }: { username: string }) {
    const { evaluationService } = useEvaluationService();
    const [personalityEvaluation, setpersonalityEvaluation] = useState<PersonalityEvaluation>();

    const getEvaluation = useCallback(async () => {
        try {
            const evaluation = await evaluationService.getEvaluationForUser(username);
            setpersonalityEvaluation(evaluation);
        } catch (err) {
            console.log(err);
        }
    }, [evaluationService, setpersonalityEvaluation, username]);

    useEffect(() => {
        getEvaluation();
    }, [getEvaluation]);

    if (personalityEvaluation === undefined) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                Evaluation Loading...
                <CircularProgress />
            </div>
        ); // Display a loading indicator while fetching data
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
        <EvaluationBarChart
            evaluationData={evaluationData}
            evaluationDescription={personalityEvaluation?.evaluationDescriptions}
        />
    );
}
