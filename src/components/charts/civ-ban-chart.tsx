import CivChartConfig, { FilterLegendConfig } from "@site/src/utils/civ-chart-config";
import Chart from "./chart";
import useDelayedColorMode from "@site/src/utils/use-delayed-color-mode";
import { merge } from 'lodash-es';
import { Filter } from "../filter/filter-dialog";

export default function CivBanChart({draftsData, filter}: {draftsData: {civDrafts: any[]}, filter: Filter}): JSX.Element {
    useDelayedColorMode();
    const draftPickData: {[key: string]: number} = draftsData.civDrafts.reduce(
        (acc, draft) => {
            const mapBans = draft.draft.filter(v => v.action === 'ban').map(v => v.map);
            for (const ban of mapBans) {
                if (acc.hasOwnProperty(ban)) {
                    acc[ban] = acc[ban] + 1;
                } else {
                    acc[ban] = 1;
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
    const options = merge(CivChartConfig(style, data), FilterLegendConfig(style, filter, false), {plugins: {
        title: {display: true, text: 'Civilization bans'},
        tooltip: {enables: true},
    }});
    return <Chart data={{datasets: [{
        data: data,
        backgroundColor: data.map((_v, i) => i % 2 === 0 ? style.getPropertyValue('--ifm-color-primary') : style.getPropertyValue('--ifm-color-secondary')),
        borderColor: data.map((_v, i) => i % 2 === 0 ? style.getPropertyValue('--ifm-color-primary-dark') : style.getPropertyValue('--ifm-color-secondary-dark')),
        borderWidth: 2,
    }], labels: keys}} options={options}></Chart>;
};
