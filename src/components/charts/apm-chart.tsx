import { Scatter } from "react-chartjs-2";
import { Chart, PointElement } from 'chart.js'
import useDelayedColorMode from "@site/src/utils/use-delayed-color-mode";

Chart.register(PointElement);

const bracketOrder = ['Champion', 'Monks', 'Mangonels', 'Knights', 'Light Cavs', 'Pikemen', 'Longswords', 'Crossbows', 'Skirms', 'Spearmen', 'Archers', 'Militia'] as const;
type Bracket = typeof bracketOrder[number];
const bracketColors: { [bracket in Bracket]: string } = {
    Champion: "#1f77b4",
    Monks: "#ff7f0e",
    Mangonels: "#2ca02c",
    Knights: "#d62728",
    "Light Cavs": "#9467bd",
    Pikemen: "#8c564b",
    Longswords: "#e377c2",
    Crossbows: "#7f7f7f",
    Skirms: "#bcbd22",
    Spearmen: "#17becf",
    Archers: "#0c5f68",
    Militia: "#680c5f"
};

export default function ApmChart({ gamesData }: { gamesData: any[] }): JSX.Element {
    useDelayedColorMode();
    let bracketApm: Map<Bracket, Array<number>> = new Map();
    gamesData.forEach(game => {
        if (!bracketApm.has(game.bracket)) {
            bracketApm.set(game.bracket, []);
        }
        bracketApm.set(game.bracket, [...bracketApm.get(game.bracket), ...game.eapm]);
    });
    const datasets = bracketOrder.map((bracket, index) => ({
        label: bracket,
        data: bracketApm.get(bracket).map(eapm => ({
            x: Math.random() * 0.4 + 0.4,
            y: eapm,
        })),
        xAxisID: `x${index == 0 ? '' : index}`,
        backgroundColor: bracketColors[bracket],
        borderColor: bracketColors[bracket],
    }));

    const xLabels = {
        id: 'xLabels',
        beforeDatasetsDraw(chart: Chart<'scatter'>) {
            const { ctx, scales } = chart;
            ctx.save();

            Object.keys(scales).forEach((axis, index) => {
                if (axis == "y") {
                    return;
                }
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(102, 102, 102, 0.2)';
                ctx.moveTo(scales.x.getPixelForValue(index), scales.x.top);
                ctx.lineTo(scales.x.getPixelForValue(index), scales.x.bottom);
                ctx.stroke();
            });

            chart.data.datasets.forEach(dataset => {
                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
                ctx.fillText(dataset.label, scales[dataset.xAxisID].getPixelForValue(0.5), scales[dataset.xAxisID].bottom + 10);
            });
        }
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'eAPM by bracket',
            },
            legend: {
                display: false,
            },
            tooltip: {
                enables: true,
                callbacks: {
                    label: ({ dataset, parsed }) => {
                        return `${dataset.label}: ${parsed.y}`;
                    },
                },
            },
        },
        layout: {
            padding: {
                bottom: 30
            }
        },
        scales: {
            ...Object.fromEntries(
                bracketOrder.map((bracket, index) => [
                    `x${index == 0 ? '' : index}`,
                    {
                        beginAtZero: true,
                        max: 1,
                        stack: 'strip',
                        grid: { display: false },
                        ticks: { display: false }
                    }
                ])
            ),
            y: {
                beginAtZero: false
            }
        },
    };
    return <Scatter data={{
        datasets
    }} options={options} plugins={[xLabels]}></Scatter>;
};
