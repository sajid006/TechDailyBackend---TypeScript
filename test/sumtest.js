/*
const sum = require('./sum').sum;
const { test } = require('media-typer');
const { mockRequest, mockResponse } = require('mock-req-res');
// const multiple = require('./sum').multiple;
test('adds 14 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});
test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
});

// Applies to all tests in this file
afterAll(() => {
    cleanUpDatabase(globalDatabase);
});
test('city database has Vienna', () => {
    expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
    expect(isCity('San Juan')).toBeTruthy();
});
describe('checkAuth', () => {
    test('should 401 if session data is not set', async () => {
        const req = mockRequest();
        const res = mockResponse();
        await checkAuth(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
    });
    test('should 200 with username from session if session data is set', async () => {
        const req = mockRequest({ username: 'hugo' });
        const res = mockResponse();
        await checkAuth(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ username: 'hugo' });
    });
});

// Promise
test('user fetched name should be Sajid Hasan', () => {
    expect.assertions(1);
    return functions.fetchUser().then((data) => {
        expect(data.name).toEqual('Sajid Hasan');
    });
});

// Async Await
test('user fetched name should be Sajid Hasan', async () => {
    expect.assertions(1);
    const data = await functions.fetchUser();
    expect(data.name).toEqual('Sajid Hasan');
});

describe('Checking names', () => {
    beforeach(() = > nameCheck());

    test('User is jeff', () => {
        const user = 'Jeff';
        expect(user).toBe('Jeff');
    });

    test('User is Karen', () => {
        const user = 'Karen';
        expect(user).toBe('Karen');
    });
})

test('creates Contract on correct date', () => {
    const NOW = '2019-05-03T08:00:00.000Z';
    const mockDateNow = jest
      .spyOn(global.Date, 'now')
      .mockImplementation(() => new Date(NOW).getTime());
  
    const mutation = `
      mutation createContract {
        createContract {
          startedOn
        }
      }
    `;
  
    const response = await graphQLRequestAsUser(mutation);
    const { data } = response.body;
  
    expect(data.startedOn).toEqual(NOW);
  
    mockDateNow.mockRestore();
  }); 


const video = {
    play() {
    return true;
    },
};

test('plays video', () => {
  const spy = jest.spyOn(video, 'play');
  const isPlaying = video.play();

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);

  spy.mockRestore();
});

const database = {
    fetchValues() {
      return 'real data';
    },
  };
  
  describe('61450440', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it('should pass', () => {
      jest
        .spyOn(database, 'fetchValues')
        .mockImplementation(() => 'default')
        .mockImplementationOnce(() => 'first call')
        .mockImplementationOnce(() => 'second call');
  
      console.log(
        [database.fetchValues(), database.fetchValues(), database.fetchValues(), database.fetchValues()].join(','),
      );
    });
    it('should pass too', () => {
      jest
        .spyOn(database, 'fetchValues')
        .mockImplementation(() => 'real data')
        .mockImplementationOnce(() => 'real data')
        .mockImplementationOnce(() => 'first call')
        .mockImplementationOnce(() => 'second call');
  
      console.log(
        [database.fetchValues(), database.fetchValues(), database.fetchValues(), database.fetchValues()].join(','),
      );
    });
  
    it('should pass 3', () => {
      const fetchValuesSpy = jest.spyOn(database, 'fetchValues');
      console.log('call original fetchValues:', database.fetchValues());
      fetchValuesSpy.mockImplementationOnce(() => 'first call').mockImplementationOnce(() => 'second call');
      console.log('call mocked fetchValues:', database.fetchValues(), database.fetchValues());
      console.log('call original fetchValues again:', database.fetchValues());
    });
  });

  jest.mock('../moduleName', () => {
    return jest.fn(() => 42);
  });
  */
