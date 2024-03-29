import * as React from 'react';
import LaptopSidebar from './LaptopSidebar'
import MobileSidebar from './MobileSidebar'

const Sidebar = React.memo(() => {
    return (
        <div>
            <LaptopSidebar/>
            {/* <MobileSidebar/> */}
        </div>
    );
})

export default Sidebar