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
    taskInputBlock: {
      minHeight: theme.spacing.unit * 10
    }
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
                <SprintRolloverButton />
                <SprintList sprintId={sprintId} />
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
