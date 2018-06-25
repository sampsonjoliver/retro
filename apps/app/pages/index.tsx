import { App } from '../components/App';
import { TaskInput } from '../components/TaskInput';

export default () => (
  <App title="Index">
    <div
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <p>Index Page</p>
      <TaskInput />
    </div>
  </App>
);
