import * as React from 'react';
import { parse } from 'query-string';

import { App } from '../components/App';
import { TaskInput } from '../components/TaskInput';
import { SprintList } from '../components/SprintList';
import { WithRouter } from '../components/WithRouter';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core';
import { SprintRolloverButton } from '../components/SprintRolloverButton';

const styles = (theme: Theme) =>
  createStyles({
    sprintList: {
      flexGrow: 1,
      overflowY: 'auto'
    },
    taskInputBlock: {
      minHeight: theme.spacing.unit * 10
    },
    sprintHeader: {
      width: '100%',
      padding: theme.spacing.unit
    },
    rolloverButton: {}
  });

class SprintPage extends React.Component<WithStyles<typeof styles>> {
  public render() {
    return (
      <WithRouter>
        {({ router }) => {
          const sprintId = parse(router.location.search).id;
          return (
            <App title={sprintId}>
              <>
                <div className={this.props.classes.sprintHeader}>
                  <SprintRolloverButton
                    className={this.props.classes.rolloverButton}
                  />
                </div>
                <SprintList
                  sprintId={sprintId}
                  className={this.props.classes.sprintList}
                />
                <div className={this.props.classes.taskInputBlock} />
                <TaskInput sprintId={sprintId} />
              </>
            </App>
          );
        }}
      </WithRouter>
    );
  }
}

const StyledSprintPage = withStyles(styles)(SprintPage);
export default StyledSprintPage;
