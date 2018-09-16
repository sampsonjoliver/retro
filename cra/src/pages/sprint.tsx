import * as React from 'react';
import { parse } from 'query-string';

import { App } from '../components/App';
import { TaskInput } from '../components/TaskInput';
import { SprintList } from '../components/SprintList';
import { WithRouter } from '../components/WithRouter';

class SprintPage extends React.Component {
  public render() {
    return (
      <WithRouter>
        {({ router }) => {
          const sprintId = parse(router.location.search).id;
          return (
            <App title={sprintId}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p>Index Page</p>
                <SprintList sprintId={sprintId} />
                <TaskInput sprintId={sprintId} />
              </div>
            </App>
          );
        }}
      </WithRouter>
    );
  }
}

export default SprintPage;
