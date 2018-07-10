import React from 'react';
import { Context } from 'next/Document';

import { App } from '../components/App';
import { TaskInput } from '../components/TaskInput';
import { initializePage } from '../utils/initialisePage';
import AvatarWidget from '../components/Avatar';

interface PageProps extends Context {
  isServer: boolean;
}

class Index extends React.Component<PageProps> {
  constructor(props: PageProps) {
    super(props);
  }

  public render() {
    // return (
    //   <div>
    //     <AvatarWidget />
    //   </div>
    // );

    return (
      <App title="Index" isServer={this.props.isServer}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p>Index Page</p>
          <TaskInput />
        </div>
      </App>
    );
  }
}

export default initializePage(Index);
