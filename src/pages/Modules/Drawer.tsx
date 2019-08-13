import React from 'react';
import clsx from 'clsx';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Typography,
  Theme
} from '@material-ui/core';
import {
  List as IconList,
  Https as HttpsIcon,
  Warning as WarningIcon,
  Description as DescriptionIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Home as HomeIcon
} from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/styles';
import { inject } from 'mobx-react';
import { githubIcon } from '../../assets';
import { AuthStore } from '../../store';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    img: {
      maxWidth: 24,
      maxHeight: 24
    }
  })
);

interface IInjectedProps {
  authStore: AuthStore;
}

const ModuleDrawer = (props: {}) => {
  const [open, setOpen] = React.useState(true);

  const onDrawerChange = () => {
    setOpen(isOpen => !isOpen);
  };

  const classes = useStyles();
  const { authStore } = props as IInjectedProps;

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        open={open}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          {open && (<Typography style={{ marginLeft: 8 }}>
            ChatTriggers
          </Typography>)}
          <IconButton onClick={onDrawerChange}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <List>
          <ListItem button>
            <ListItemIcon>
              <IconList color="primary" />
            </ListItemIcon>
            <ListItemText>
              All Modules
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <HttpsIcon color="secondary" />
            </ListItemIcon>
            <ListItemText>
              Trusted Modules
            </ListItemText>
          </ListItem>
          {authStore.authedUser && authStore.authedUser.rank === 'admin' && (
            <ListItem button>
              <ListItemIcon>
                <WarningIcon color="error" />
              </ListItemIcon>
              <ListItemText>
                Flagged Modules
              </ListItemText>
            </ListItem>
          )}
          {authStore.authedUser && (
            <ListItem button>
              {/* <ListItemIcon>

              </ListItemIcon> */}
              <ListItemText>
                My Modules
              </ListItemText>
            </ListItem>
          )}
        </List>
        <Divider />
        <List>
          <ListItem button>
            {/* icon */}
            <ListItemText>
              Slate
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText>
              Javadocs
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <img
                className={classes.img}
                src={githubIcon}
                alt="Github Octocat icon"
              />
            </ListItemIcon>
            <ListItemText>
              GitHub
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>
              Home
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default inject('authStore')(ModuleDrawer);