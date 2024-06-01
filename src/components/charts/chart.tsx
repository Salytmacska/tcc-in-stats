import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    Tooltip,
    Title,
    Legend,
} from 'chart.js';

ChartJS.register(LinearScale, CategoryScale, BarElement, Tooltip, Title, Legend);

export default function Chart({data, options}): JSX.Element {
    return (
        <Bar data={data} options={options}></Bar>
    );
}