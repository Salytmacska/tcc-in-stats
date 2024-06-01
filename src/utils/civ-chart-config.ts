import { Filter } from "../components/filter/filter-dialog";
import { GameNameMappingToDisplayName } from "../data/mapping";

const CivChartConfig = (style, data) => ({
    scales: {
        x: {
            grid: {
                display: false,
            },
            ticks: {
                autoSkip: false,
                color: data.map((_v, i) => i % 2 === 0 ? style.getPropertyValue('--ifm-color-primary') : style.getPropertyValue('--ifm-color-secondary')),
            },
        },
        y: {
            grid: {
                color: style.getPropertyValue('--ifm-color-emphasis-300'),
            },
            ticks: {
                color: style.getPropertyValue('--ifm-color-emphasis-800'),
            },
        },
    },
});

const _FilterLegendConfig = (style, filter: Filter, showMapsFilter: boolean) => {
    return {
        plugins: {
            legend: {
                display: filter != null && filter.appliedFilters.any,
                labels: {
                    boxWidth: 0,
                    boxHeight: 0,
                    font: {
                        size: 8,
                    },
                    generateLabels: () => {
                        if (filter == null) return [];
                        if (showMapsFilter) {
                            return [
                                {text: `Maps: ${filter.appliedFilters.maps ? filter.maps.map(gameName => GameNameMappingToDisplayName[gameName]).join(', ') : 'All'}`, fontColor: style.getPropertyValue('--ifm-color-emphasis-800')},
                                {text: `Brackets: ${filter.appliedFilters.brackets ? filter.brackets.join(', ') : 'All'}`, fontColor: style.getPropertyValue('--ifm-color-emphasis-800')},
                                {text: `Stages: ${filter.appliedFilters.stages ? filter.stages.join(', ') : 'All'}`, fontColor: style.getPropertyValue('--ifm-color-emphasis-800')},
                            ];
                        }
                        return [
                            {text: `Brackets: ${filter.appliedFilters.brackets ? filter.brackets.join(', ') : 'All'}`, fontColor: style.getPropertyValue('--ifm-color-emphasis-800')},
                            {text: `Stages: ${filter.appliedFilters.stages ? filter.stages.join(', ') : 'All'}`, fontColor: style.getPropertyValue('--ifm-color-emphasis-800')},
                        ];
                    },
                },
            },
        },
    };
}

export default CivChartConfig;
export const FilterLegendConfig = _FilterLegendConfig;
