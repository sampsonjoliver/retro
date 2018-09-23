import * as React from 'react';
import { SprintService } from '../services/sprint';
import { inject, observer } from 'mobx-react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';

interface State {
  isRollingOver: boolean;
}

interface Props {
  SprintService?: SprintService;
}

@inject('SprintService')
@observer
class SprintRolloverDialog extends React.Component<Props, State> {
  public state = {
    isRollingOver: false
  };

  public handleClose = () => {
    this.setState({ isRollingOver: false });
  };

  public startRollover = () => {
    this.props.SprintService!.rolloverSprint();
    this.setState({ isRollingOver: true });
  };

  public render() {
    return (
      <Dialog
        open={this.props.SprintService!.isCurrentSprintEnded}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Your current sprint has ended
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            It's time to move on. Let's get you rolled over to a new one =)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={this.state.isRollingOver}
            onClick={this.startRollover}
            color="primary"
            autoFocus
          >
            Okay!
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export { SprintRolloverDialog };
