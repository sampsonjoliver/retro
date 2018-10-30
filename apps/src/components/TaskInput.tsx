import * as React from 'react';
import {
  TextField,
  Icon,
  Paper,
  withStyles,
  createStyles,
  WithStyles,
  Button,
  Theme
} from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import { inject, observer } from 'mobx-react';
import { drawerWidth } from '../consts';
import { AuthService, AuthState } from '../services/auth';
import { TodoService } from 'src/services/todo';

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
    }
  });

interface Props extends WithStyles<typeof styles> {
  TodoService?: TodoService;
  AuthService?: AuthService;
  sprintId?: string;
}

interface State {
  todoName: string;
  isTodoCreated: boolean;
}

const onEnter = (func: () => void) => (event: React.KeyboardEvent) => {
  if (event.keyCode === 13) {
    return func();
  }
};

@inject('TodoService', 'AuthService')
@observer
class TaskInputComponent extends React.Component<Props, State> {
  public state = {
    todoName: '',
    isTodoCreated: false
  };

  public handleChange = event => {
    this.setState({
      todoName: event.target.value
    });
  };

  public createTodo() {
    if (this.props.AuthService!.authState === AuthState.signedIn) {
      this.props.TodoService!.createTodo({
        sprintId:
          this.props.sprintId || this.props.AuthService!.user!.currentSprintId!,
        userId: this.props.AuthService!.user!.uid!,
        title: this.state.todoName,
        status: 'incomplete'
      });

      this.setState({
        todoName: '',
        isTodoCreated: true
      });

      setTimeout(() => {
        this.setState({ isTodoCreated: false });
      }, 1200);
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
          onKeyUp={onEnter(() => this.createTodo())}
        />
        <Button
          variant="fab"
          color={this.state.isTodoCreated ? 'primary' : 'secondary'}
          onClick={() => this.createTodo()}
        >
          <Icon>{this.state.isTodoCreated ? 'check' : 'add'}</Icon>
        </Button>
      </Paper>
    );
  }
}

export const TaskInput = withStyles(styles, { withTheme: true })(
  TaskInputComponent
);
