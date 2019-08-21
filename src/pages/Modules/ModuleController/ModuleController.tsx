import React from 'react';
import {
  Paper,
  Container,
  Theme,
  FormGroup,
  FormControlLabel,
  TextField,
  Checkbox
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { view, store } from 'react-easy-state';
import { getModules } from '../../../api';
import { Auth, Modules } from '../../../store';
import TablePagination from './TablePagination';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    margin: theme.spacing(5),
    padding: theme.spacing(2)
  },
  content: {
    margin: 0,
    padding: 0,
    paddingTop: 8,
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center'
  }
}));

export default view(() => {
  const data = store<{ timeout: NodeJS.Timeout | undefined}>({
    timeout: undefined
  });

  const classes = useStyles({});

  const onSearchChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    if (data.timeout) {
      clearTimeout(data.timeout);
    }

    const target = e.target;
    Modules.store.viewConfig.search = target.value as string;
    
    data.timeout = setTimeout(() => {
      Modules.store.modules = [];
      getModules();
    }, 1500);
  };

  const onCheckFlagged = () => {
    Modules.store.viewConfig.flagged = !Modules.store.viewConfig.flagged;
  };

  const onCheckTrusted = () => {
    Modules.store.viewConfig.trusted = !Modules.store.viewConfig.trusted;
  };

  const onCheckUserModules = () => {
    Modules.store.viewConfig.userModules = !Modules.store.viewConfig.userModules;
  };

  /*
  search textbox
  checkbox for:
    my modules
    trusted modules
    flagged modules
  dropdown for modules per page
  page select
  */

  return (
    <Paper
      className={classes.root}
      square
      elevation={4}
    >
      <Container>
        <TextField
          id="search-query"
          placeholder="Search Modules"
          InputLabelProps={{ shrink: true }}
          value={Modules.store.viewConfig.search || ''}
          onChange={onSearchChange}
          fullWidth
        />
        <Container className={classes.content}>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={Modules.store.viewConfig.userModules} onChange={onCheckUserModules} />}
              label="My Modules"
            />
            <FormControlLabel
              control={<Checkbox checked={Modules.store.viewConfig.trusted} onChange={onCheckTrusted} />}
              label="Trusted Modules"
            />
            {Auth.isTrusted && (
              <FormControlLabel
                control={<Checkbox checked={Modules.store.viewConfig.flagged} onChange={onCheckFlagged} />}
                label="Flagged Modules"
              />
            )}
          </FormGroup>
          <TablePagination />
        </Container>
      </Container>
    </Paper>
  );
});
