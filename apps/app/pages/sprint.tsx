import React from 'react';
import { Context } from 'next/document';
import { withRouter, SingletonRouter } from 'next/router';

import { App } from '../components/App';
import { TaskInput } from '../components/TaskInput';
import { initializePage } from '../utils/initialisePage';
import { SprintList } from '../components/SprintList';

interface PageProps extends Context {
  isServer: boolean;
  router: SingletonRouter;
}

class Index extends React.Component<PageProps> {
  constructor(props: PageProps) {
    super(props);
  }

  public render() {
    const sprintId: string | undefined = this.props.router.query
      ? (this.props.router.query.id as string)
      : undefined;

    return (
      <App title={sprintId} isServer={this.props.isServer}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p>Index Page</p>
          <SprintList sprintId={sprintId} />
          <TaskInput sprintId={sprintId} />
        </div>
      </App>
    );
  }
}

const IndexWithRouter = withRouter(Index);
export default initializePage(IndexWithRouter);
