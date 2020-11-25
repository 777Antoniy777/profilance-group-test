const initialState = {
  users: [
    {
      id: 1,
      name: 'Admin',
      password: '1',
    },
    {
      id: 2,
      name: 'User',
      password: '2',
    },
  ],
};

export default function createState(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
