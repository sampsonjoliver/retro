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

interface Props {
  SprintService?: SprintService;
}

@inject('SprintService')
@observer
class SprintEndedDialog extends React.Component<Props> {
  public startRollover = () => {
    this.props.SprintService!.rolloverSprint();
  };

  public render() {
    return (
      <Dialog
        open={this.props.SprintService!.isCurrentSprintEnded}
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
            disabled={this.props.SprintService!.isSprintRollingOver}
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

export { SprintEndedDialog };
