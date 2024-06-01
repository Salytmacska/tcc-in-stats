import useDelayedColorMode from "@site/src/utils/use-delayed-color-mode";
import Chart from "./chart";
import { Filter } from "../filter/filter-dialog";
import { GameNameMappingToDisplayName } from "@site/src/data/mapping";

export default function GameTimeChart({gamesData, filter}: {gamesData: any[], filter: Filter}): JSX.Element {
    useDelayedColorMode();
    const groupedDurationCounts = [
        {value: 0, lowerBound: null, upperBound: 15, label: '<= 14'},
        {value: 0, lowerBound: 15, upperBound: 20, label: '15 - 19'},
        {value: 0, lowerBound: 20, upperBound: 25, label: '20 - 24'},
        {value: 0, lowerBound: 25, upperBound: 30, label: '25 - 29'},
        {value: 0, lowerBound: 30, upperBound: 35, label: '30 - 34'},
        {value: 0, lowerBound: 35, upperBound: 40, label: '35 - 39'},
        {value: 0, lowerBound: 40, upperBound: 45, label: '40 - 44'},
        {value: 0, lowerBound: 45, upperBound: 50, label: '45 - 49'},
        {value: 0, lowerBound: 50, upperBound: 55, label: '50 - 54'},
        {value: 0, lowerBound: 55, upperBound: 60, label: '55 - 59'},
        {value: 0, lowerBound: 60, upperBound: 65, label: '60 - 64'},
        {value: 0, lowerBound: 65, upperBound: 70, label: '65 - 69'},
        {value: 0, lowerBound: 70, upperBound: 75, label: '70 - 74'},
        {value: 0, lowerBound: 75, upperBound: 80, label: '75 - 79'},
        {value: 0, lowerBound: 80, upperBound: 85, label: '80 - 84'},
        {value: 0, lowerBound: 85, upperBound: 90, label: '85 - 89'},
        {value: 0, lowerBound: 90, upperBound: null, label: '90 <='},
    ];
    gamesData.forEach(gameData => {
        const gameTimeMinutes = gameData.duration / (1000 * 60);
        const bucket = groupedDurationCounts.find(bucket => (bucket.lowerBound == null || gameTimeMinutes >= bucket.lowerBound) && (bucket.upperBound == null || gameTimeMinutes < bucket.upperBound));
        bucket.value += 1;
    });

    const data = [];
    const keys = [];
    for (const {label, value} of groupedDurationCounts) {
        data.push(value);
        keys.push(label);
    }

    const style = getComputedStyle(document.body);
    const options = {
        backgroundColor: style.getPropertyValue('--ifm-color-primary'),
        borderColor: style.getPropertyValue('--ifm-color-primary-dark'),
        borderWidth: 2,
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: style.getPropertyValue('--ifm-color-emphasis-800'),
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
        plugins: {
            title: {display: true, text: 'Number of games by length'},
            tooltip: {enables: true},
            legend: {
                display: filter != null && filter.appliedFilters.any,
                labels: {
                    boxWidth: 0,
                    boxHeight: 0,
                    font: {
                        size: 9,
                    },
                    generateLabels: () => {
                        if (filter == null) return [];
                        return [
                            {text: `Maps: ${filter.appliedFilters.maps ? filter.maps.map(gameName => GameNameMappingToDisplayName[gameName]).join(', ') : 'All'}`, fontColor: style.getPropertyValue('--ifm-color-emphasis-800')},
                            {text: `Brackets: ${filter.appliedFilters.brackets ? filter.brackets.join(', ') : 'All'}`, fontColor: style.getPropertyValue('--ifm-color-emphasis-800')},
                            {text: `Stages: ${filter.appliedFilters.stages ? filter.stages.join(', ') : 'All'}`, fontColor: style.getPropertyValue('--ifm-color-emphasis-800')},
                        ];
                    },
                },
            },
        },
    };
    return (
        <Chart data={{datasets: [{data: data}], labels: keys}} options={options}></Chart>
    );
}