import CivChartConfig, { FilterLegendConfig } from "@site/src/utils/civ-chart-config";
import Chart from "./chart";
import useDelayedColorMode from "@site/src/utils/use-delayed-color-mode";
import { merge } from 'lodash-es';
import { Filter } from "../filter/filter-dialog";

export default function CivPlayChart({gamesData, filter}: {gamesData: any[], filter: Filter}): JSX.Element {
    useDelayedColorMode();
    const civPlayData: {[key: string]: number} = gamesData.reduce(
        (acc, game) => {
            const civsPlayed = [game.winningCiv, game.losingCiv];
            for (const civ of civsPlayed) {
                if (acc.hasOwnProperty(civ)) {
                    acc[civ] = acc[civ] + 1;
                } else {
                    acc[civ] = 1;
                }
            }
            return acc;
        },
        {},
    );
    const data = [];
    const keys = [];
    for (const [key, value] of Object.entries(civPlayData).sort(([_ka, a], [_kb, b]) => b - a)) {
        data.push(value);
        keys.push(key);
    }

    const style = getComputedStyle(document.body);
    const options = merge(CivChartConfig(style, data), FilterLegendConfig(style, filter, true), {plugins: {
        title: {display: true, text: 'Civilizations played'},
        tooltip: {enables: true},
    }});
    return <Chart data={{datasets: [{
        data: data,
        backgroundColor: data.map((_v, i) => i % 2 === 0 ? style.getPropertyValue('--ifm-color-primary') : style.getPropertyValue('--ifm-color-secondary')),
        borderColor: data.map((_v, i) => i % 2 === 0 ? style.getPropertyValue('--ifm-color-primary-dark') : style.getPropertyValue('--ifm-color-secondary-dark')),
        borderWidth: 2,
    }], labels: keys}} options={options}></Chart>;
};
