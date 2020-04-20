const styles = theme => ({
    // Parent container 
    parent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '600px',
        marginTop: '10px',
        marginLeft: '30px',
        borderRadius: '10px',
        borderTop: "6px solid #ea1e63",
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        [theme.breakpoints.up("sm")]: {
            width: '540px',   
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
      alignItems: 'center',
      margin: 'auto',
      [theme.breakpoints.up("sm")]: {
        width: '540px',   
        },
      [theme.breakpoints.down("sm")]: { 
        flexDirection: "column",
        alignItems: 'center',
        width: '250px',  
        }
  },
  btnContainer: {
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
   cardBodyContainer1: {
      display: "flex",
      flexDirection: "Column",
      [theme.breakpoints.up("sm")]: {
          maxWidth: "260px", 
          height: '385px',  
      },
      [theme.breakpoints.down("sm")]: { 
        width: "250px",  
    },
    [theme.breakpoints.down("xs")]: { 
      width: "250px",  
  }
  }, 
   cardBodyContainer2: {
      display: "flex",
      flexDirection: "Column",
      alignItems: 'center',  
      [theme.breakpoints.up("sm")]: {
          maxWidth: "250px", 
          height: '385px',   
      },
      [theme.breakpoints.down("sm")]: { 
        width: "250px",  
    }
  }, 
  cardBodyTable: {
    display: "flex",
    Width: "700px", 
    height: "575px", 
    marginLeft: "20px", 
    top: "20px",
    [theme.breakpoints.up("md")]: {
        width: "700px",
    },  
    [theme.breakpoints.down("md")]: {
        width: "600px",
    },   
      [theme.breakpoints.down("sm")]: { 
       width: "90%",  
        marginLeft: "0px", 
    },
    [theme.breakpoints.down("xs")]: { 
      width: "100%x", 
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