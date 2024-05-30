const MapChartConfig = (style) => ({
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
});

export default MapChartConfig;
