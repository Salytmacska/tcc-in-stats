const CivChartConfig = (style, data) => ({
    scales: {
        x: {
            grid: {
                color: style.getPropertyValue('--ifm-color-emphasis-400'),
            },
            ticks: {
                // color: style.getPropertyValue('--ifm-color-emphasis-800'),
                autoSkip: false,
                color: data.map((_v, i) => i % 2 === 0 ? style.getPropertyValue('--ifm-color-primary') : style.getPropertyValue('--ifm-color-secondary')),
            },
        },
        y: {
            grid: {
                color: style.getPropertyValue('--ifm-color-emphasis-400'),
            },
            ticks: {
                color: style.getPropertyValue('--ifm-color-emphasis-800'),
            },
        },
    },
});

export default CivChartConfig;
