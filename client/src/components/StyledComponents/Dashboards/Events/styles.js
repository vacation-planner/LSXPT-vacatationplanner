const styles = theme => ({
    cardBody: {
        display: "flex",
        /* justifyContent: "space-between", */
         backgroundColor: "#E91E63",  
        /* height: "10%", */
        [theme.breakpoints.up("sm")]: {
            width: "100%",    
        }
    },
    cardBody2: {
      display: "flex",
      //backgroundColor: 'green',
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
      //backgroundColor: 'red',
      flexDirection: "Column",
      [theme.breakpoints.up("sm")]: {
          width: "100px",   
      }
  },
  cardBodyContainer3: {
      display: "flex",
      flexDirection: "row",
      [theme.breakpoints.up("sm")]: {
          width: "50%",   
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