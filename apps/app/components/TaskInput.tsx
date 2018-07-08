import {
  TextField,
  Icon,
  Paper,
  withStyles,
  createStyles,
  WithStyles,
  Button
} from '@material-ui/core';
import { drawerWidth } from '../consts';

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

interface Props extends WithStyles<typeof styles> {}

const TaskInputComponent = (props: Props) => (
  <Paper elevation={5} classes={{ root: props.classes.input }}>
    <TextField
      InputLabelProps={{
        shrink: true
      }}
      placeholder="Create a new task"
      margin="normal"
      style={{ flexGrow: 1, paddingRight: props.theme!.spacing.unit * 5 }}
    />
    <Button variant="fab" color="secondary">
      <Icon>add</Icon>
    </Button>
  </Paper>
);

export const TaskInput = withStyles(styles, { withTheme: true })(
  TaskInputComponent
);
