import * as React from 'react';
import { SprintService } from '../services/sprint';
import { inject, observer } from 'mobx-react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress
} from '@material-ui/core';

interface Props {
  SprintService?: SprintService;
}

@inject('SprintService')
@observer
class SprintRolloverProgressDialog extends React.Component<Props, {}> {
  public render() {
    return (
      <Dialog
        open={this.props.SprintService!.isSprintRollingOver}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Rolling over your sprint (this may take a few seconds)
        </DialogTitle>
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }
}

export { SprintRolloverProgressDialog };
