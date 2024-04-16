
import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import { Box, } from '@mui/material';


export const ChartComponent = (props) => {
    const {
        asset,
        candleStickData = [],
        colors: {
            backgroundColor = 'white',
            lineColor = '#2962FF',
            textColor = 'black',
        } = {},
    } = props;


    const getChartData = async (symbol, interval, series, candleStickData) => {
        try {
            const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=${interval}`);
            if (response.status === 200) {
                const data = await response.json();
                data.forEach((el) => {
                    candleStickData.push({
                        time: parseFloat(el[0] / 1000),
                        open: parseFloat(el[1]),
                        high: parseFloat(el[2]),
                        low: parseFloat(el[3]),
                        close: parseFloat(el[4]),
                    });
                });
                // console.log('setdata')
                series.setData(candleStickData)
                subscribeToChartData(symbol, interval, series)
            } else {
                console.log('Some other error');
            }
        } catch (error) {
            console.log('Error while getting chart data', error);
        }
    };

    const subscribeToChartData = (symbol, interval, series) => {
        const socket = new WebSocket(`wss://stream.binance.com:443/ws/${symbol.toLowerCase()}@kline_${interval}`)

        socket.addEventListener("connection", event => {
            // socket.send("Connection established")
        });
        socket.onpong = () => {
            // console.log('connection is alive');
        };

        socket.addEventListener("message", event => {
            // console.log("Message from server ", event.data)
            let dataObj = JSON.parse(event.data)
            if (dataObj.k?.t) {
                // console.log('update')
                if (!chartContainerRef.current) {
                    console.log('closing')
                    socket.close()
                    return;
                }
                const kline = dataObj.k;
                series.update({
                    time: parseFloat(kline.t / 1000),
                    open: parseFloat(kline.o),
                    high: parseFloat(kline.h),
                    low: parseFloat(kline.l),
                    close: parseFloat(kline.c),
                })

            }
        });

        socket.addEventListener("error", event => {
            console.error("Socket error:", event);
            socket.close();
        });
    }

    const chartContainerRef = useRef();

    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            };
            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { color: '#161A1E' },
                    textColor: 'white',
                },
                grid: {
                    vertLines: { color: '#444' },
                    horzLines: { color: '#444' },
                },
                timeScale: {
                    timeVisible: true,
                    secondsVisible: false,
                    // shiftVisibleRangeOnNewBar: true,
                    rightOffset: 3
                },
                localization: {
                    locale: 'eng'
                },
                crosshair: {
                    mode: 0
                },
                watermark: {
                    visible: false,
                    fontSize: 60,
                    text: 'AssetsFi',
                    color: "rgba(256, 256, 256, 0.1)",
                },

            });
            // chart.timeScale().fitContent();
            chart.timeScale().applyOptions({
                barSpacing: 20,
            });

            let precision = 2;

            if (asset.price.includes('.')) {
                let precisionNum = asset.price.slice(asset.price.indexOf('.') + 1).length;
                if (precisionNum > 2) {
                  precision = precisionNum;
                }
              }

            const newSeries = chart.addCandlestickSeries({
                priceFormat: {
                    type: 'price',
                    precision: precision,
                    minMove: 1 / Math.pow(10, precision),
                }
            });
            getChartData(asset.pair, '5m', newSeries, candleStickData)

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [backgroundColor, lineColor, textColor]
    );

    return (
        <Box key={'coinChart'} sx={{
            width: '100%', height: '100%',
        }} ref={chartContainerRef} />
    );
};
