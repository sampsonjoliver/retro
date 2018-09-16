import * as React from 'react';
import {
  TextField,
  Icon,
  Paper,
  withStyles,
  createStyles,
  WithStyles,
  Button,
  CircularProgress,
  Theme
} from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import { inject, observer } from 'mobx-react';
import { drawerWidth } from '../consts';
import { FirestoreService } from '../services/firestore';
import { AuthStore, AuthState } from '../services/auth';

const styles = (theme: Theme) =>
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
    },
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700]
      }
    },
    fabProgress: {
      position: 'fixed',
      bottom: '10px',
      right: '18px',
      zIndex: 1
    }
  });

interface Props extends WithStyles<typeof styles> {
  FirestoreService?: FirestoreService;
  auth?: AuthStore;
  sprintId?: string;
}

interface State {
  todoName: string;
  isCreatingTodo: boolean;
  isTodoCreated: boolean;
}

@inject('FirestoreService', 'auth')
@observer
class TaskInputComponent extends React.Component<Props, State> {
  public state = {
    todoName: '',
    isCreatingTodo: false,
    isTodoCreated: false
  };

  public handleChange = event => {
    this.setState({
      todoName: event.target.value
    });
  };

  public createTodo() {
    if (this.props.auth!.authState === AuthState.signedIn) {
      this.props.FirestoreService!.createTodo({
        sprintId:
          this.props.sprintId || this.props.auth!.user!.currentSprintId!,
        userId: this.props.auth!.user!.uid!,
        title: this.state.todoName,
        status: 'incomplete'
      });

      this.setState({
        todoName: '',
        isCreatingTodo: true
      });

      setTimeout(() => {
        this.setState({ isCreatingTodo: false, isTodoCreated: true });
        setTimeout(() => {
          this.setState({ isCreatingTodo: false, isTodoCreated: false });
        }, 2000);
      }, 1500);
    }
  }

  public render() {
    return (
      <Paper elevation={5} classes={{ root: this.props.classes.input }}>
        <TextField
          InputLabelProps={{ shrink: true }}
          placeholder="Create a new task"
          margin="normal"
          style={{
            flexGrow: 1,
            paddingRight: this.props.theme!.spacing.unit * 5
          }}
          value={this.state.todoName}
          onChange={this.handleChange}
        />
        <Button
          variant="fab"
          color={this.state.isTodoCreated ? 'primary' : 'secondary'}
          onClick={() => this.createTodo()}
        >
          <Icon>{this.state.isTodoCreated ? 'check' : 'add'}</Icon>
        </Button>
        {this.state.isCreatingTodo && (
          <CircularProgress
            size={68}
            className={this.props.classes.fabProgress}
          />
        )}
      </Paper>
    );
  }
}

export const TaskInput = withStyles(styles, { withTheme: true })(
  TaskInputComponent
);
