import { User } from './user';

describe('User', () => {
  it('should create an object conforming to User', () => {
    const user: User = {
      email: 'test@example.com',
      name: 'Test User',
      role: 'user',
    };
    expect(user).toBeTruthy();
  });
});