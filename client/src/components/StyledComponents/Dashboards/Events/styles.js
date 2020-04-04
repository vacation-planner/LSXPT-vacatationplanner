const styles = theme => ({
    parent: {
        display: "flex",
        width: '900px',
        marginTop: '10px',
        marginLeft: '30px',
        borderRadius: '10px',
        /*  backgroundColor: "#E91E63", */  
        [theme.breakpoints.up("sm")]: {
            /* width: "100%", */    
        },
        [theme.breakpoints.down('sm')]: {
            width: '80%',
            borderTop: "6px solid #ea1e63",
            boxShadow: '0 0 0, 0 0 0'
        },
        [theme.breakpoints.down('xs')]: {
            border: '0',
            boxShadow: '0 0 0, 0 0 0',
            borderTop: "4px solid #ea1e63",
            borderRadius: '0px',
            marginLeft: '0px',
            width: '100%',
            padding: "5px",
            margin: "auto, auto",
        },  
    },
    cardBody2: {
      display: "flex",
      flexDirection: "row",
      [theme.breakpoints.up("sm")]: {
          width: "100%",   
      }
  },
  cardBodyContainer1: {
      display: "flex",
      flexDirection: "Column",
      [theme.breakpoints.up("sm")]: {
          width: "25%",   
      }
  },
 cardBodyContainer2: {
      display: "flex",
      flexDirection: "Column",
      [theme.breakpoints.up("sm")]: {
          width: "100px",   
      }
  },
  cardBodyContainer3: {
    display: "flex",
    justifyContent: 'center',
    flexDirection: "row",
    alignItems: 'center',
    backgroundColor: '#E91E63',
    [theme.breakpoints.up("sm")]: {  
       width: "100%",  
    },
    [theme.breakpoints.down("sm")]: { 
      flexDirection: "column",
    }
  },
    gridItem: {
        cursor: "pointer",
         padding: 15, 
        paddingLeft: 35,
        fontSize: "2rem",
    },
    helpButton: {
        height: "38px",
        width: "100px",
        borderRadius: "10px",
        marginLeft: "auto",
        marginRight: "auto",
        [theme.breakpoints.down("sm")]: { 
            width: "100%",
            borderRadius: "0px",    
         },
      },
  
  });
  export default styles;