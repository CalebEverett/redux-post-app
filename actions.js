export const ADD_POST_ERROR = 'ADD_POST_ERROR'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const UPDATE_POST_ERROR = 'UPDATE_POST_ERROR'
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS'
export const DELETE_POST_ERROR = 'DELETE_POST_ERROR'
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'

export const VIEW_POST = 'VIEW_POST'

export function addPost(postContent) {
  return (dispatch, getState) => {
    const { firebase } = getState();

    firebase.child('posts')
      .push(postContent, error => {
        if (error) {
          console.error('ERROR @ appPost :', error); // eslint-disable-line no-console
          dispatch({
            type: ADD_POST_ERROR,
            payload: error
          });
        }
      })
  }
}

export function setViewPostKey(key) {
  console.log('setViewPostKey: ', key)
  return {
    type: VIEW_POST,
    key
  }
}

export function registerListeners() {
  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref = firebase.child('posts');

    ref.on('child_added', snapshot => dispatch({
      type: ADD_POST_SUCCESS,
      payload: recordFromSnapshot(snapshot)
    }));

    ref.on('child_changed', snapshot => dispatch({
      type: UPDATE_POST_SUCCESS,
      payload: recordFromSnapshot(snapshot)
    }));

    ref.on('child_removed', snapshot => dispatch({
      type: DELETE_POST_SUCCESS,
      payload: recordFromSnapshot(snapshot)
    }));
  };
}

function recordFromSnapshot(snapshot) {
  let record = {[snapshot.key()]: snapshot.val()}
  return record;
}
