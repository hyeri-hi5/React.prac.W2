//초기값
const initialState = {
  list: [],
};

//action
const LOAD = "dictionary/LOAD";
const CREATE = "dictionary/CREATE";
const UPDATE = "dictionary/UPDATE";
const DELETE = "dictionary/DELETE";

//action creators
export function loadWord(word_list) {
  return { type: LOAD, word_list };
}

export function createWord(word_list) {
  return { type: CREATE, word_list };
}

export function updateWord(word_index) {
  return { type: UPDATE, word_index };
}

export function deleteWord(word_index) {
  return { type: DELETE, word_index };
}

//reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "dictionary/LOAD": {
      return { list: action.word_list };
    }
    default:
      return state;
  }
}
