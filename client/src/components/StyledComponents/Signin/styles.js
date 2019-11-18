const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    fontSize: '2.0rem',
    [theme.breakpoints.up(400 + theme.spacing(2))]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
  },
  paper: {
    marginTop: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#E91E63'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    fontSize: '2.0rem',
  },
  submit: {
    marginTop: theme.spacing(3),
    fontSize: '1.5rem'
  },
  typography: {
    fontSize: '2.5rem'
  }
});

  export default styles