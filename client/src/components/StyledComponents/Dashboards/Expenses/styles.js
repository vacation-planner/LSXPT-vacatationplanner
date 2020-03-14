const styles = theme => ({
    // Parent container 
    parent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderTop: "12px solid pink",
        //width: '90%',
        maxWidth: '400px',
        padding: '30px',
        marginLeft: '30px',
        borderRadius: '15px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        [theme.breakpoints.down('xs')]: {
            border: '0',
            width: '100%',
            boxShadow: '0 0 0, 0 0 0'
        },
        [theme.breakpoints.down('sm')]: {
            border: '0',
            width: '90%',
            alignItems: 'center',
            boxShadow: '0 0 0, 0 0 0'
        },
    },
   /*  cardBody: {
        display: "flex",
        [theme.breakpoints.up("sm")]: {
            width: "100%",    
        }
    }, */
    cardBody2: {
      display: "flex",
      backgroundColor: '#E91E63',
      flexDirection: "Column",
      alignItems: 'center',
      margin: 'auto',
      [theme.breakpoints.up("sm")]: {
        width: '250px',   
       /*  width: "100%",   */ 
      },
      [theme.breakpoints.down("sm")]: { 
        flexDirection: "column",
        alignItems: 'center',
        width: '225px',  
    }
  },
 /*  cardBodyContainer1: {
      display: "flex",
      backgroundColor: 'green',
      flexDirection: "Column",
      [theme.breakpoints.up("sm")]: {
          width: "100%",   
      },
      [theme.breakpoints.down("sm")]: { 
        width: '100%',
        maxWidth: "250px",  
    }
  }, */
 /*  cardBodyContainer2: {
      display: "flex",
      flexDirection: "Column",
      backgroundColor: 'red',
      alignItems: 'center',  
      [theme.breakpoints.up("sm")]: {
          width: "50%",   
      }
  }, */
  cardBodyContainer3: {
      display: "flex",
      flexDirection: "row",
       backgroundColor: "blue",  
           [theme.breakpoints.up("sm")]: {
          width: "100%",
          height: "40px",   
      }
  },
    gridItem: {
        cursor: "pointer",
        padding: 15,
        paddingLeft: 35,
        fontSize: "2rem",
    },
});

export default styles;