import * as React from 'react';
import {
  ListItem,
  ListItemIcon,
  Icon,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core';
import * as Hammer from 'react-hammerjs';
import { inject } from '../../node_modules/mobx-react';
import { FirestoreService } from '../services/firestore';
import { AuthStore } from '../services/auth';

const DIRECTION_NONE = 1;
const DIRECTION_LEFT = 2;
const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 8;
const DIRECTION_DOWN = 16;

const DIRECTION_HORIZONTAL = 6;
const DIRECTION_VERTICAL = 24;
const DIRECTION_ALL = 30;

const TODO_UPDATE_DELAY = 1000;

interface Props {
  todo: Todo;
  sprint?: Sprint;
  isAddedToMyDay: boolean;
  isCurrentSprint: boolean;
  FirestoreService?: FirestoreService;
  auth?: AuthStore;
}

interface State {
  isReorderEnabled: boolean;
  isPanning: boolean;
  panX: number;
  panY: number;
  menuAnchorEl?: Element;
  pendingTodoStatusToggle: NodeJS.Timer | null;
  overrideTodoState?: 'complete' | 'incomplete';
}

@inject('FirestoreService', 'auth')
class TodoView extends React.Component<Props, State> {
  public state = {
    isReorderEnabled: false,
    isPanning: false,
    panX: 0,
    panY: 0,
    menuAnchorEl: undefined,
    pendingTodoStatusToggle: null,
    overrideTodoState: undefined
  };

  public setPanEnabled(isEnabled: boolean) {
    this.setState({ isPanning: isEnabled, panX: 0, panY: 0 });
  }

  public setReorderEnabled(isEnabled: boolean) {
    console.log('Set reorder to ', isEnabled);
    this.setPanEnabled(isEnabled);
    this.setState({
      isReorderEnabled: isEnabled
    });
  }

  public setPan(event: HammerInput) {
    const panX = this.state.isReorderEnabled ? 0 : event.deltaX;
    const panY = this.state.isReorderEnabled ? event.deltaY : 0;
    this.setState({
      panX,
      panY
    });
  }

  public resetPan() {
    this.setReorderEnabled(false);
  }

  public openMenu(event: React.MouseEvent<HTMLElement>) {
    this.setState({ menuAnchorEl: event.currentTarget });
  }

  public closeMenu() {
    this.setState({ menuAnchorEl: undefined });
  }

  public deleteTodo() {
    this.props.FirestoreService!.archiveTodo(this.props.todo);
    this.closeMenu();
  }

  public moveTodoToSprint(sprintId: string) {
    this.props.FirestoreService!.updateTodo({
      ...this.props.todo,
      sprintId
    });
    this.closeMenu();
  }

  public toggleTodoStatus() {
    if (this.state.pendingTodoStatusToggle) {
      clearTimeout(this.state.pendingTodoStatusToggle!);
    }

    const newStatus =
      (this.state.overrideTodoState || this.props.todo.status) === 'complete'
        ? 'incomplete'
        : 'complete';

    const timeout = setTimeout(() => {
      this.props.FirestoreService!.updateTodo({
        ...this.props.todo,
        status: newStatus
      });
    }, TODO_UPDATE_DELAY);

    this.setState({
      pendingTodoStatusToggle: timeout,
      overrideTodoState: newStatus
    });
  }

  public render() {
    const secondaryText = this.props.sprint
      ? this.props.sprint.name
      : this.props.isAddedToMyDay
        ? 'My Day'
        : null;

    const gestureTranslationStyles = {
      transform: `translate(${this.state.panX}px, ${this.state.panY}px)`,
      transition: this.state.isPanning ? '' : 'transform .5s ease-out',
      willChange: 'transform'
    };

    const { currentSprintId, backlogId } = this.props.auth!.user!;
    const isInCurrentSprint = this.props.todo.sprintId === currentSprintId;
    const isInBacklog = this.props.todo.sprintId === backlogId;

    return (
      <>
        <div style={gestureTranslationStyles}>
          <ListItem button disableRipple>
            <ListItemIcon>
              <Checkbox
                icon={<Icon>check_circle_outline</Icon>}
                checkedIcon={<Icon>check_circle</Icon>}
                checked={
                  (this.state.overrideTodoState || this.props.todo.status) ===
                  'complete'
                }
                onChange={() => this.toggleTodoStatus()}
              />
            </ListItemIcon>
            <ListItemText
              primary={this.props.todo.title}
              secondary={secondaryText}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={event => this.openMenu(event)}>
                <Icon>more_vert</Icon>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </div>
        <Menu
          anchorEl={this.state.menuAnchorEl}
          open={Boolean(this.state.menuAnchorEl)}
          onClose={() => this.closeMenu()}
        >
          {!isInCurrentSprint && (
            <MenuItem onClick={() => this.moveTodoToSprint(currentSprintId!)}>
              <ListItemIcon>
                <Icon>wb_sunny</Icon>
              </ListItemIcon>
              <ListItemText inset primary="Move to Current Sprint" />
            </MenuItem>
          )}
          {!isInBacklog && (
            <MenuItem onClick={() => this.moveTodoToSprint(backlogId!)}>
              <ListItemIcon>
                <Icon>list_alt</Icon>
              </ListItemIcon>
              <ListItemText inset primary="Move to Backlog" />
            </MenuItem>
          )}
          <MenuItem onClick={() => this.deleteTodo()}>
            <ListItemIcon>
              <Icon>delete</Icon>
            </ListItemIcon>
            <ListItemText inset primary="Delete" />
          </MenuItem>
        </Menu>
      </>
    );
  }
}

export { TodoView };
