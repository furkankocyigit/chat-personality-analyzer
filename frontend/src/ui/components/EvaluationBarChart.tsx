import { BarChart } from '@mui/x-charts';
import { Container, Typography } from '@mui/material';

export function EvaluationBarChart({
    evaluationData,
    evaluationDescription,
}: {
    evaluationData: { personality: string; score: number }[];
    evaluationDescription: string;
}) {
    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography variant="h4">Evaluation Result</Typography>
            <Container>
                <BarChart
                    xAxis={[
                        {
                            label: 'Personality',
                            data: evaluationData.map((personality) => personality.personality),
                            scaleType: 'band',
                        },
                    ]}
                    series={[
                        {
                            data: evaluationData.map((personality) => personality.score),
                        },
                    ]}
                    yAxis={[{ label: 'Score (0-1)' }]}
                    width={evaluationData.length * 50}
                    height={500}
                />
                <Typography variant="h5">{evaluationDescription}</Typography>
            </Container>
        </div>
    );
}
