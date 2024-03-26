import React, { useState, useEffect, use } from 'react';
import styles from './binancedata.module.css';
import { Button, Typography, Box, Grid, Tabs, Tab } from '@mui/material';
import AddBinanceKeys from '@/components/AddBinanceKeys/AddBinanceKeys'
import BinanceAssetsInfo from '@/components/BinanceAssetsInfo/BinanceAssetsInfo'
import { useRouter } from 'next/navigation'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';



function BinanceData() {
    const [binanceData, setBinanceData] = useState({ "totalValue": 245.3572248016735, "dailyValue": 0, "dailyChange": 14.4153773350355, "dailyChangePercentage": "5.88", "assets": [{ "asset": "BTC", "free": "0.00138361", "locked": "0", "freeze": "0", "withdrawing": "0", "ipoable": "0", "btcValuation": "0", "name": "Bitcoin", "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png", "price": "70653.96", "totalValue": "97.76", "dailyChange": "5.22", "dailyChangePercentage": "5.64" }, { "asset": "WBTC", "free": "0.00080001", "locked": "0", "freeze": "0", "withdrawing": "0", "ipoable": "0", "btcValuation": "0", "name": "Wrapped Bitcoin", "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/3717.png", "price": "70678.3", "totalValue": "56.54", "dailyChange": "3.05", "dailyChangePercentage": "5.70" }, { "asset": "SHIB", "free": "1508710.69", "locked": "0", "freeze": "0", "withdrawing": "0", "ipoable": "0", "btcValuation": "0", "name": "Shiba Inu", "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/5994.png", "price": "0.00003111", "totalValue": "46.94", "dailyChange": "5.33", "dailyChangePercentage": "12.80" }, { "asset": "USDT", "free": "20", "locked": "0", "freeze": "0", "withdrawing": "0", "ipoable": "0", "btcValuation": "0", "name": "Tether USDt", "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png", "totalValue": 20, "dailyChange": 0, "dailyChangePercentage": 0, "price": 1 }, { "asset": "LUNC", "free": "77345.92665", "locked": "0", "freeze": "0", "withdrawing": "0", "ipoable": "0", "btcValuation": "0", "name": "Terra Classic", "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/4172.png", "price": "0.00016975", "totalValue": "13.13", "dailyChange": "0.56", "dailyChangePercentage": "4.45" }, { "asset": "TRX", "free": "54.2644", "locked": "0", "freeze": "0", "withdrawing": "0", "ipoable": "0", "btcValuation": "0", "name": "TRON", "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png", "price": "0.12172", "totalValue": "6.61", "dailyChange": "0.17", "dailyChangePercentage": "2.62" }, { "asset": "SOL", "free": "0.00951", "locked": "0", "freeze": "0", "withdrawing": "0", "ipoable": "0", "btcValuation": "0", "name": "Solana", "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png", "price": "194.69", "totalValue": "1.85", "dailyChange": "0.06", "dailyChangePercentage": "3.21" }, { "asset": "LUNA", "free": "0.9075538", "locked": "0", "freeze": "0", "withdrawing": "0", "ipoable": "0", "btcValuation": "0", "name": "Terra", "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/20314.png", "price": "1.2858", "totalValue": "1.17", "dailyChange": "-0.01", "dailyChangePercentage": "-0.44" }, { "asset": "USDC", "free": "1", "locked": "0", "freeze": "0", "withdrawing": "0", "ipoable": "0", "btcValuation": "0", "name": "USDC", "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png", "price": "0.9999", "totalValue": "1.00", "dailyChange": "0.00", "dailyChangePercentage": "0.03" }, { "asset": "ALT", "free": "0.365", "locked": "0", "freeze": "0", "withdrawing": "0", "ipoable": "0", "btcValuation": "0", "name": "Altlayer", "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/29073.png", "price": "0.63477", "totalValue": "0.23", "dailyChange": "0.03", "dailyChangePercentage": "16.87" }, { "asset": "DOT", "free": "0.00576", "locked": "0", "freeze": "0", "withdrawing": "0", "ipoable": "0", "btcValuation": "0", "name": "Polkadot", "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png", "price": "9.921", "totalValue": "0.06", "dailyChange": "0.00", "dailyChangePercentage": "5.09" }, { "asset": "SEI", "free": "0.0447", "locked": "0", "freeze": "0", "withdrawing": "0", "ipoable": "0", "btcValuation": "0", "name": "Sei", "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/23149.png", "price": "0.8571", "totalValue": "0.04", "dailyChange": "0.00", "dailyChangePercentage": "4.03" }, { "asset": "FDUSD", "free": "0.02286368", "locked": "0", "freeze": "0", "withdrawing": "0", "ipoable": "0", "btcValuation": "0", "name": "First Digital USD", "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/26081.png", "price": "0.9992", "totalValue": "0.02", "dailyChange": "-0.00", "dailyChangePercentage": "-0.03" }, { "asset": "STRK", "free": "0.00591", "locked": "0", "freeze": "0", "withdrawing": "0", "ipoable": "0", "btcValuation": "0", "name": "Starknet", "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/22691.png", "price": "2.327", "totalValue": "0.01", "dailyChange": "0.00", "dailyChangePercentage": "8.23" }, { "asset": "ROSE", "free": "0.024714", "locked": "0", "freeze": "0", "withdrawing": "0", "ipoable": "0", "btcValuation": "0", "name": "Oasis Network", "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/7653.png", "price": "0.15166", "totalValue": "0.00", "dailyChange": "0.00", "dailyChangePercentage": "4.39" }] })


    const fetchData = async () => {
        try {
            const response = await fetch(`/api/server/binance/userdata`);
            if (response.status === 200) {
                const data = await response.json();
                setBinanceData(data)
                console.log(data)
            } else {
                const data = await response.json();
                console.log('Some other error');
                console.log(data)
            }
        } catch (error) {
            console.log('Error while getting portfolios data', error);
        }
    }

    const handleChange = () => {
        fetchData().catch(console.error)
    }

    useEffect(() => {
        // fetchData().catch(console.error)
    }, []);

    return (
        <Box component='main' className={styles.main} sx={{
            width: { xs: '100%', md: `calc(100% - 260px)` },
            ml: { xs: '0', md: '260px' }, // sidebar width
            minHeight: { xs: `100vh`, md: `calc(100vh - 100px)` },
            mt: { xs: '0px', md: '100px' } // header hight
        }}>

            {
                binanceData ? (
                    binanceData.totalValue ? (
                        <BinanceAssetsInfo assetsInfo={binanceData} handleChange={handleChange} />
                    ) : (
                        <AddBinanceKeys handleChange={handleChange} />
                    )

                )
                    : (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 200px)' }}>
                            <CircularProgress size={70} sx={{
                                color: '#0228EE',
                            }} />
                        </Box>
                    )
            }
        </Box >
    );
}
export default BinanceData;