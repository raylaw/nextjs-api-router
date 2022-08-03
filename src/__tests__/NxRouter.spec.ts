import { NxRouter } from '../NxRouter';

describe('tests NxRouter modules', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockJsonFn = jest.fn((ctx) => ctx);

  const mockStatusFn = jest.fn((statusCode: number) => ({
    json: mockJsonFn,
  }));

  const mockNxResponse = {
    status: mockStatusFn,
  };

  const getHandler = jest.fn((ctx) => ctx);
  const postHandler = jest.fn((ctx) => ctx);
  const deleteHandler = jest.fn((ctx) => ctx);
  const patchHandler = jest.fn((ctx) => ctx);
  const putHandler = jest.fn((ctx) => ctx);

  const nestedGetHandler = jest.fn((ctx) => ctx);

  const router = new NxRouter();

  router.group('user', () => {
    router.get('profile', getHandler);
    router.post('profile/.*', postHandler);
    router.delete('profile/.*', deleteHandler);
    router.patch('profile/.*', patchHandler);
    router.put('profile/.*', putHandler);

    router.group('order', () => {
      router.get('books', nestedGetHandler);
    });
  });

  it('should not trigger any handler if no route is matched', async () => {
    router.handle('api/v1', {
      req: { url: '/api/v1/hello/', method: 'GET' },
      res: mockNxResponse,
    } as any);
    expect(mockJsonFn).toHaveBeenCalledWith({
      error: 'no-route-handler',
      url: '/api/v1/hello/',
    });
  });

  it('should trigger the GET handler only', async () => {
    router.handle('api/v1', {
      req: { url: '/api/v1/user/profile/', method: 'GET' },
      res: mockNxResponse,
    } as any);
    expect(getHandler.mock.calls.length).toBe(1);
    expect(postHandler.mock.calls.length).toBe(0);
    expect(deleteHandler.mock.calls.length).toBe(0);
    expect(patchHandler.mock.calls.length).toBe(0);
    expect(putHandler.mock.calls.length).toBe(0);
  });

  it('should trigger the POST handler', async () => {
    router.handle('api/v1', {
      req: { url: '/api/v1/user/profile/', method: 'POST' },
      res: mockNxResponse,
    } as any);
    expect(getHandler.mock.calls.length).toBe(0);
    expect(postHandler.mock.calls.length).toBe(1);
    expect(deleteHandler.mock.calls.length).toBe(0);
    expect(patchHandler.mock.calls.length).toBe(0);
    expect(putHandler.mock.calls.length).toBe(0);
  });

  it('should trigger the DELETE handler', async () => {
    router.handle('api/v1', {
      req: { url: '/api/v1/user/profile/', method: 'DELETE' },
      res: mockNxResponse,
    } as any);
    expect(getHandler.mock.calls.length).toBe(0);
    expect(postHandler.mock.calls.length).toBe(0);
    expect(deleteHandler.mock.calls.length).toBe(1);
    expect(patchHandler.mock.calls.length).toBe(0);
    expect(putHandler.mock.calls.length).toBe(0);
  });

  it('should trigger the PATCH handler', async () => {
    router.handle('api/v1', {
      req: { url: '/api/v1/user/profile/', method: 'PATCH' },
      res: mockNxResponse,
    } as any);
    expect(getHandler.mock.calls.length).toBe(0);
    expect(postHandler.mock.calls.length).toBe(0);
    expect(deleteHandler.mock.calls.length).toBe(0);
    expect(patchHandler.mock.calls.length).toBe(1);
    expect(putHandler.mock.calls.length).toBe(0);
  });

  it('should trigger the PUT handler', async () => {
    router.handle('api/v1', {
      req: { url: '/api/v1/user/profile/', method: 'PUT' },
      res: mockNxResponse,
    } as any);
    expect(getHandler.mock.calls.length).toBe(0);
    expect(postHandler.mock.calls.length).toBe(0);
    expect(deleteHandler.mock.calls.length).toBe(0);
    expect(patchHandler.mock.calls.length).toBe(0);
    expect(putHandler.mock.calls.length).toBe(1);
  });

  it('should trigger the nested route handler', async () => {
    router.handle('api/v1', {
      req: { url: '/api/v1/user/order/books/', method: 'GET' },
      res: mockNxResponse,
    } as any);
    expect(getHandler.mock.calls.length).toBe(0);
    expect(postHandler.mock.calls.length).toBe(0);
    expect(deleteHandler.mock.calls.length).toBe(0);
    expect(patchHandler.mock.calls.length).toBe(0);
    expect(putHandler.mock.calls.length).toBe(0);
    expect(nestedGetHandler.mock.calls.length).toBe(1);
  });

  test('url with query parameter', async () => {
    router.handle('api/v1', {
      req: { url: '/api/v1/user/profile/?id=123', method: 'GET' },
      res: mockNxResponse,
    } as any);
    expect(getHandler.mock.calls.length).toBe(1);
  });

  test('url with query parameter and without trailing slash', async () => {
    router.handle('api/v1', {
      req: { url: '/api/v1/user/profile?id=123', method: 'GET' },
      res: mockNxResponse,
    } as any);
    expect(getHandler.mock.calls.length).toBe(1);
  });

  const router2 = new NxRouter();
  const getUserProfileHandler = jest.fn((ctx) => ctx);
  const getUserPostCommentsHandler = jest.fn((ctx) => ctx);
  const fallbackHandler = jest.fn((ctx) => ctx);

  router2.group('user', () => {
    router2.group('\\d+', () => {
      // e.g. /user/1234/profile/
      router2.get('profile', getUserProfileHandler);

      router2.group('post', () => {
        router2.group('\\d+', () => {
          // e.g. /user/1234/post/5678/comments/
          router2.route('comments', ['GET'], getUserPostCommentsHandler);
        });
      });
    });

    router2.any('.*', fallbackHandler);
  });

  test('special route #1', async () => {
    router2.handle('api/v2', {
      req: { url: '/api/v2/user/4321/profile/', method: 'GET' },
      res: mockNxResponse,
    } as any);
    expect(getUserProfileHandler.mock.calls.length).toBe(1);
    expect(getUserPostCommentsHandler.mock.calls.length).toBe(0);
    expect(fallbackHandler.mock.calls.length).toBe(0);
  });

  test('special route #2', async () => {
    router2.handle('api/v2', {
      req: { url: '/api/v2/user/uid1234/profile/', method: 'GET' },
      res: mockNxResponse,
    } as any);
    expect(getUserProfileHandler.mock.calls.length).toBe(0);
    expect(getUserPostCommentsHandler.mock.calls.length).toBe(0);
    expect(fallbackHandler.mock.calls.length).toBe(1);
  });

  test('special route #3', async () => {
    router2.handle('api/v2', {
      req: { url: '/api/v2/user/4321/post/6789/comments/', method: 'GET' },
      res: mockNxResponse,
    } as any);
    expect(getUserProfileHandler.mock.calls.length).toBe(0);
    expect(getUserPostCommentsHandler.mock.calls.length).toBe(1);
    expect(fallbackHandler.mock.calls.length).toBe(0);
  });

  test('special route #4', async () => {
    router2.handle('api/v2', {
      req: { url: '/api/v2/user/', method: 'POST' },
      res: mockNxResponse,
    } as any);
    expect(getUserProfileHandler.mock.calls.length).toBe(0);
    expect(getUserPostCommentsHandler.mock.calls.length).toBe(0);
    expect(fallbackHandler.mock.calls.length).toBe(1);
  });
});
