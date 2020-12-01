import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../Navigation items/NavigationItems'; 
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../hoc/Aux';


const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Closed];
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return(
        <Aux>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}> 
                <div className={classes.Logo}>
                     <Logo/>
                </div>
            
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
        
    );
}

export default SideDrawer;