import CivChartConfig from "@site/src/utils/civ-chart-config";
import Chart from "./chart";
import useDelayedColorMode from "@site/src/utils/use-delayed-color-mode";
import { merge } from 'lodash-es';

export default function CivWinChart({gamesData}): JSX.Element {
    useDelayedColorMode();
    const civWinData: {[key: string]: {wins: number, losses: number, winRate: number}} = gamesData.reduce(
        (acc, game) => {
            const winningCiv = game.winningCiv;
            const losingCiv = game.losingCiv;
            if (acc.hasOwnProperty(winningCiv)) {
                acc[winningCiv].wins += 1;
            } else {
                acc[winningCiv] = {wins: 1, losses: 0};
            }
            if (acc.hasOwnProperty(losingCiv)) {
                acc[losingCiv].losses += 1;
            } else {
                acc[losingCiv] = {wins: 0, losses: 1};
            }
            return acc;
        },
        {},
    );
    const data = [];
    const gamesPlayed = [];
    const keys = [];
    Object.entries(civWinData).forEach(([key, value]) => {value.winRate = value.wins / (value.wins + value.losses)});
    for (const [key, value] of Object.entries(civWinData).sort(([_ka, a], [_kb, b]) => b.winRate - a.winRate)) {
        data.push(value.winRate);
        gamesPlayed.push(value.losses + value.wins);
        keys.push(key);
    }

    const style = getComputedStyle(document.body);
    const options = merge(CivChartConfig(style, data), {
        plugins: {
            title: {display: true, text: 'Civilization win rate'},
            tooltip: {
                enables: true,
                callbacks: {
                    label: ({dataIndex, raw}) => {
                        return `${(raw * 100).toPrecision(4)}% (${gamesPlayed[dataIndex]} games played)`;
                    },
                },
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: function(value, index, values) {
                            return value * 100 + '%';
                    },
                },
            },
        },
    });
    return <Chart data={{datasets: [{
        data: data,
        backgroundColor: data.map((_v, i) => i % 2 === 0 ? style.getPropertyValue('--ifm-color-primary') : style.getPropertyValue('--ifm-color-secondary')),
        borderColor: data.map((_v, i) => i % 2 === 0 ? style.getPropertyValue('--ifm-color-primary-dark') : style.getPropertyValue('--ifm-color-secondary-dark')),
        borderWidth: 2,
    }], labels: keys}} options={options}></Chart>;
};
