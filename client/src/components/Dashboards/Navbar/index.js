import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// @material-ui/icons
import Search from '@material-ui/icons/Search';
import Email from '@material-ui/icons/Email';
import Face from '@material-ui/icons/Face';
import Settings from '@material-ui/icons/Settings';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Explore from '@material-ui/icons/Explore';
// core components
import Header from '../../Material-UI/components/Header/Header';
import Button from '../../Material-UI/components/CustomButtons/Button.jsx';

// Navbar Styles pulled from here
import navbarsStyle from '../../Material-UI/assets/jss/material-kit-pro-react/views/componentsSections/navbarsStyle.jsx';

class SectionNavbars extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Header
            brand="VacationPlanner"
            color="rose"
            >

            </Header>
            // <Header
            //     brand="VacationPlanner"
            //     color="rose"
            //     links={
            //         <div className={classes.collapse}>
            //             <List className={classes.list + ' ' + classes.mrAuto}>
            //                 <ListItem className={classes.listItem}>
            //                     <Button
            //                         href="#pablo"
            //                         className={
            //                             classes.navLink +
            //                             ' ' +
            //                             classes.navLinkActive
            //                         }
            //                         onClick={e => e.preventDefault()}
            //                         color="transparent"
            //                         >
            //                         Sign In
            //                     </Button>
            //                 </ListItem>
            //                 <ListItem className={classes.listItem}>
            //                     <Button
            //                         href="#pablo"
            //                         className={classes.navLink}
            //                         onClick={e => e.preventDefault()}
            //                         color="transparent"
            //                         >
            //                         Sign Up
            //                     </Button>
            //                 </ListItem>
            //             </List>
            //             {/* <div className={classes.mlAuto}>
            //                 <CustomInput
            //                 white
            //                 inputRootCustomClasses={
            //                     classes.inputRootCustomClasses
            //                 }
            //                 formControlProps={{
            //                     className: classes.formControl
            //                 }}
            //                 inputProps={{
            //                     placeholder: 'Search',
            //                     inputProps: {
            //                         'aria-label': 'Search',
            //                         className: classes.searchInput
            //                     }
            //                 }}
            //                 />
            //                 <Button color="white" justIcon round>
            //                 <Search className={classes.searchIcon} />
            //                 </Button>
            //             </div> */}
            //             </div>
            //         </div>
            //     }
            // />
        );
    }
}

export default withStyles(navbarsStyle)(SectionNavbars);
