import useDelayedColorMode from "@site/src/utils/use-delayed-color-mode";
import Chart from "./chart";
import CivChartConfig from "@site/src/utils/civ-chart-config";
import { merge } from 'lodash-es';

export default function CivPickChart({draftsData}): JSX.Element {
    useDelayedColorMode();
    const draftPickData: {[key: string]: number} = draftsData.civDrafts.reduce(
        (acc, draft) => {
            const mapPicks = draft.draft.filter(v => v.action === 'pick').map(v => v.map);
            for (const pick of mapPicks) {
                if (acc.hasOwnProperty(pick)) {
                    acc[pick] = acc[pick] + 1;
                } else {
                    acc[pick] = 1;
                }
            }
            return acc;
        },
        {},
    );
    const data = [];
    const keys = [];
    for (const [key, value] of Object.entries(draftPickData).sort(([_ka, a], [_kb, b]) => b - a)) {
        data.push(value);
        keys.push(key);
    }

    const style = getComputedStyle(document.body);
    const options = merge(CivChartConfig(style, data), {plugins: {
        title: {display: true, text: 'Civilization picks'},
        tooltip: {enables: true},
    }});
    return <Chart data={{datasets: [{
        data: data,
        backgroundColor: data.map((_v, i) => i % 2 === 0 ? style.getPropertyValue('--ifm-color-primary') : style.getPropertyValue('--ifm-color-secondary')),
        borderColor: data.map((_v, i) => i % 2 === 0 ? style.getPropertyValue('--ifm-color-primary-dark') : style.getPropertyValue('--ifm-color-secondary-dark')),
        borderWidth: 2,
    }], labels: keys}} options={options}></Chart>;
};
