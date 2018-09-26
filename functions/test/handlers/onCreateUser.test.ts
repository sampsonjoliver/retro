import { onCreateUser } from '../../src/handlers/onCreateUser';

jest.mock('../../src/models/sprint', () => ({}));
jest.mock('../../src/models/user', () => ({}));

describe('onCreateUser', () => {
  it('exists', () => {
    const handler = onCreateUser;
    expect(handler).toBeDefined();
  });
});
