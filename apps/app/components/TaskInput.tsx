import React from 'react';
import {
  TextField,
  Icon,
  Paper,
  withStyles,
  createStyles,
  WithStyles,
  Button
} from '@material-ui/core';
import { inject } from 'mobx-react';
import { drawerWidth } from '../consts';
import { FirestoreService } from '../services/firestore';

const styles = theme =>
  createStyles({
    input: {
      backgroundColor: theme.palette.background.default,
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
      paddingBottom: theme.spacing.unit * 2,
      paddingTop: theme.spacing.unit * 2,
      display: 'flex',
      position: 'fixed',
      left: 0,
      [theme.breakpoints.up('md')]: {
        left: `${drawerWidth}px`
      },
      right: 0,
      bottom: 0
    }
  });

interface Props extends WithStyles<typeof styles> {
  FirestoreService: FirestoreService;
}

interface State {
  title: string;
}

@inject('FirestoreService')
class TaskInputComponent extends React.Component<Props, State> {
  public state = {
    title: 'test'
  };

  public createTodo() {
    const title = this.state.title;
    console.log('Title ', title);
    this.props.FirestoreService.createTodo({ title, status: 'incomplete' });
  }

  public render() {
    return (
      <Paper elevation={5} classes={{ root: this.props.classes.input }}>
        <TextField
          InputLabelProps={{
            shrink: true
          }}
          placeholder="Create a new task"
          margin="normal"
          style={{
            flexGrow: 1,
            paddingRight: this.props.theme!.spacing.unit * 5
          }}
        />
        <Button
          variant="fab"
          color="secondary"
          onClick={() => this.createTodo()}
        >
          <Icon>add</Icon>
        </Button>
      </Paper>
    );
  }
}

export const TaskInput = withStyles(styles, { withTheme: true })(
  TaskInputComponent
);
