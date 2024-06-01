import Chart from "./chart";
import { GameNameMappingToDisplayName, mapDraftNameToGameNameMapping } from "@site/src/data/mapping";
import MapChartConfig from "@site/src/utils/map-chart-config";
import useDelayedColorMode from "@site/src/utils/use-delayed-color-mode";
import { merge } from 'lodash-es';
import { Filter } from "../filter/filter-dialog";
import { FilterLegendConfig } from "@site/src/utils/civ-chart-config";

export default function MapPlayChart({gamesData, filter}: {gamesData: any[], filter: Filter}): JSX.Element {
    useDelayedColorMode();
    const mapData: {[key: string]: number} = gamesData.reduce(
        (acc, game) => {
            if (acc.hasOwnProperty(game.map)) {
                acc[game.map] = acc[game.map] + 1;
            } else {
                acc[game.map] = 1;
            }
            return acc;
        },
        {},
    );
    const data = [];
    const keys = [];
    for (const [key, value] of Object.entries(mapData).sort(([k, a], [ka, b]) => b - a)) {
        data.push(value);
        keys.push(GameNameMappingToDisplayName[key]);
    }
    
    const style = getComputedStyle(document.body);
    const options = merge(MapChartConfig(style), FilterLegendConfig(style, filter, false), {plugins: {
        title: {display: true, text: 'Maps played'},
        plugins: {tooltip: {enables: true}},
    }});
    return <Chart data={{datasets: [{data: data}], labels: keys}} options={options}></Chart>;
};
