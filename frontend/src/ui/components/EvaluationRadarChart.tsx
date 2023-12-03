import { Typography, Container } from '@mui/material';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);
export function EvaluationRadarChart({
    evaluationData,
    evaluationDescription,
}: {
    evaluationData: { personality: string; score: number }[];
    evaluationDescription: string;
}) {
    const chartData = {
        labels: evaluationData.map((item) => item.personality), // Extract labels from data
        datasets: [
            {
                label: 'Scores',
                data: evaluationData.map((item) => item.score), // Extract scores from data
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            r: {
                min: 0, // Set the minimum value of the radial axis
                max: 1, // Set the maximum value of the radial axis
                ticks: {
                    stepSize: 0.1, // Adjust the step size between ticks if needed
                },
            },
        },
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4">Evaluation Result</Typography>
            <Radar
                data={chartData}
                options={chartOptions}
            />
            <Typography variant="h5">{evaluationDescription}</Typography>
        </Container>
    );
}
