const styles = theme => ({
    // Parent container 
    parent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        //borderTop: "12px solid purple",
        //width: '90%',
        backgroundImage: 'url("../../../images/42545.jpg")',
        width: '600px',
        /* padding: '30px', */
        marginTop: '20px',
        marginLeft: '30px',
        borderRadius: '15px',
        borderTop: "12px solid #ea1e63",
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        [theme.breakpoints.up("sm")]: {
            width: '540px',   
           /*  width: "100%",   */ 
          },
        [theme.breakpoints.down('sm')]: {
            /* border: '0', */
            width: '80%',
            borderTop: "8px solid #ea1e63",
            /* alignItems: 'center', */
            boxShadow: '0 0 0, 0 0 0'
        },
        [theme.breakpoints.down('xs')]: {
            border: '0',
           /*  width: '100%', */
            boxShadow: '0 0 0, 0 0 0',
            borderTop: "4px solid #ea1e63",
            borderRadius: '0px',
            marginLeft: '0px',
            width: '100%',
            padding: "5px",
            margin: "auto, auto",
            //backgroundColor: '#FAFAFA',
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
     /*  backgroundColor: '#E91E63',  */
      flexDirection: "row",
      alignItems: 'center',
      margin: 'auto',
      [theme.breakpoints.up("sm")]: {
        width: '540px',   
       /*  width: "100%",   */ 
      },
      [theme.breakpoints.down("sm")]: { 
        flexDirection: "column",
        alignItems: 'center',
        width: '250px',  
    }
  },
  btnContainer: {
    display: "flex",
    backgroundColor: 'green',
    justifyContent: 'center',
    flexDirection: "row",
    alignItems: 'center',
    backgroundColor: '#E91E63',
    /* marginLeft: '100px',  */
    /* marginRight: '0px', */
    [theme.breakpoints.up("sm")]: {
      /*  width: '250px',  */   
       width: "100%",  
    },
    [theme.breakpoints.down("sm")]: { 
      flexDirection: "column",
      alignItems: 'center',
      /* width: '100%', */  
  }
},
   cardBodyContainer1: {
      display: "flex",
      /* backgroundColor: 'orange', */
      flexDirection: "Column",
      [theme.breakpoints.up("sm")]: {
          maxWidth: "260px", 
          height: '385px',  
      },
      [theme.breakpoints.down("sm")]: { 
       /*  width: '100%', */
        width: "250px",  
    },
    [theme.breakpoints.down("xs")]: { 
     /*  width: '100%', */
      width: "250px",  
  }
  }, 
   cardBodyContainer2: {
      display: "flex",
      flexDirection: "Column",
     /*  backgroundColor: 'gray', */
      alignItems: 'center',  
      [theme.breakpoints.up("sm")]: {
          maxWidth: "250px", 
          height: '385px',   
      },
      [theme.breakpoints.down("sm")]: { 
       /*  width: '100%', */
        width: "250px",  
    }
  }, 
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