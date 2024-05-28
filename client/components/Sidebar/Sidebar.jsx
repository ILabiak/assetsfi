import * as React from 'react';
import LaptopSidebar from './LaptopSidebar'

const Sidebar = React.memo(() => {
    return (
        <div>
            <LaptopSidebar/>
        </div>
    );
})

export default Sidebar