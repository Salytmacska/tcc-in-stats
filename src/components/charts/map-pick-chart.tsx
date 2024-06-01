import Chart from "./chart";
import { GameNameMappingToDisplayName, mapDraftNameToGameNameMapping } from "@site/src/data/mapping";
import MapChartConfig from "@site/src/utils/map-chart-config";
import useDelayedColorMode from "@site/src/utils/use-delayed-color-mode";
import { merge } from 'lodash-es';
import { Filter } from "../filter/filter-dialog";
import { FilterLegendConfig } from "@site/src/utils/civ-chart-config";

export default function MapPickChart({draftsData, filter}: {draftsData: {mapDrafts: any[]}, filter: Filter}): JSX.Element {
    useDelayedColorMode();
    const draftPickData: {[key: string]: number} = draftsData.mapDrafts.reduce(
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
    for (const [key, value] of Object.entries(draftPickData).sort(([k, a], [ka, b]) => b - a)) {
        data.push(value);
        keys.push(GameNameMappingToDisplayName[mapDraftNameToGameNameMapping[key]]);
    }
    
    const style = getComputedStyle(document.body);
    const options = merge(MapChartConfig(style), FilterLegendConfig(style, filter, false), {plugins: {
        title: {display: true, text: 'Map picks'},
        plugins: {tooltip: {enables: true}},
    }});
    return <Chart data={{datasets: [{data: data}], labels: keys}} options={options}></Chart>;
};
