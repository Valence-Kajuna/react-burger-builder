import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../Navigation items/NavigationItems'; 
import classes from './SideDrawer.css';

const SideDrawer = (props) => {
    //...
    return(
        <div className={classes.SideDrawer}> 
            <Logo/>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
    );
}

export default SideDrawer;