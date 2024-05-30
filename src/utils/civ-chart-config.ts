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

export default CivChartConfig;
