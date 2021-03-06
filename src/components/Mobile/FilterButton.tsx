import React from 'react';
import {
  Paper,
  Typography,
  ButtonBase,
  Theme,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { KeyboardArrowRight } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { History } from 'history';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  button: {
    padding: theme.spacing(2),
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
}));

interface IFilterButtonProps {
  history: History;
}

export default withRouter((props: IFilterButtonProps) => {
  const classes = useStyles({});

  const onClick = (): void => {
    props.history.push('/modules/filter');
  };

  return (
    <Paper className={classes.root}>
      <ButtonBase
        className={classes.button}
        focusRipple
        onClick={onClick}
      >
        <Typography>Filters</Typography>
        <KeyboardArrowRight />
      </ButtonBase>
    </Paper>
  );
});
