const get = (path) => {
  // console.log('getting', path);
  // let response = {
  //   status: 200
  // }


  // if (path === 'fakeurl/reviews') {
  //   response.data = [
  //     {
  //       state: 'CHANGES_REQUESTED',
  //       user: { login: 'bob', url: 'https://github.com/bob', avatar_url: 'https://github.com/bob/avatar' },
  //       submitted_at: new Date()
  //     }
  //   ];
  // } else {
  //   response.data = [{
  //     created_at: new Date(),
  //     url: 'fakeurl'
  //   }]
  // }

  return new Promise(resolve => resolve(mockedRequests[path]));
};

export default {
  create: () => {
    console.log('creating client');
    
    return { get };
  }
}

let mockedRequests = {};

export const mockRequest = ((request, response) => {
  mockedRequests[request] = response;

  return {
    create: () => {
      console.log('creating client');
      
      return { get };
    }
  }
});