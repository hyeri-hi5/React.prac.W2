// dictionary.js
import { db } from "../../Firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";

// Actions 액션 객체는 아니고 타입 정의 부분
const LOAD = "dictionary/LOAD";
const CREATE = "dictionary/CREATE";
const CHECK = "dictionary/CHECK";
const UPDATE = "dictionary/UPDATE";
const DELETE = "dictionary/DELETE";

//초기값 설정: 맨 처음에는 이 값을 가지고 있어야 해.
const initialState = {
  list: [],
};

// Action Creators 액션생성 함수 만들기
export function loadWord(word_list) {
  return { type: LOAD, word_list };
}

export function createWord(state) {
  return { type: CREATE, state };
}

export function checkWord(word_index) {
  return { type: CHECK, word_index };
}

export function updateWord(updated_word) {
  return { type: UPDATE, updated_word };
}

export function deleteWord(word_index) {
  // console.log("지울 버킷 인덱스", word_index);
  return { type: DELETE, word_index };
}

//middlewares 파이어베이스랑 통신
export const loadWordFB = () => {
  return async function (dispatch) {
    const word_data = await getDocs(collection(db, "word"));
    // console.log(word_data);

    let word_list = [];

    word_data.forEach((w) => {
      // console.log(w.data());
      word_list.push({ id: w.id, ...w.data() });
    });
    const sortedList = word_list.sort((a, b) => {
      return b.date - a.date;
    });
    // console.log(word_list);
    dispatch(loadWord(sortedList));
  };
};

export const addWordFB = (word) => {
  return async function (dispatch, getState) {
    const docRef = await addDoc(collection(db, "word"), word);
    // console.log(docRef);-> 알 수 없는 데이터로 나옴..
    const word_data = { id: docRef.id, ...word };
    // console.log(word_data);-> 추가한 단어의 배열 나옴
    dispatch(createWord(word_data));
  };
};

export const checkWordFB = (word_id) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "word", word_id);
    const _word_list = getState().dictionary.list;

    const card = _word_list.filter((a) => {
      return a.id === word_id;
    });
    // console.log(card[0].done);
    if (card[0].done === false) {
      await updateDoc(docRef, { done: true });
    } else {
      await updateDoc(docRef, { done: false });
    }

    const word_index = _word_list.findIndex((b) => {
      return b.id === word_id;
    });
    dispatch(checkWord(word_index));
  };
};

export const updateWordFB = (updated_word) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "word", updated_word);
    // console.log(docRef);
    const _word_list = getState().dictionary.list;

    const card = _word_list.filter((a) => {
      return a.id === updated_word.id;
    });
    await updateDoc(
      docRef,
      { word: updated_word.word },
      { mean: updated_word.mean },
      { ex: updated_word.ex }
    );

    word_data.forEach((w) => {
      // console.log(w.data());
      word_list.push({ id: w.id, ...w.data() });
    });
    const theCard = { id: docRef.id, ...word };
  };
  dispatch(updateWord(word));
};

export const deleteWordFB = (word_id) => {
  return async function (dispatch, getState) {
    if (!word_id) {
      window.alert("아이디가 없어요");
      return;
    }
    const docRef = doc(db, "word", word_id);
    await deleteDoc(docRef);

    const _word_list = getState().dictionary.list;
    const word_index = _word_list.findIndex((b) => {
      return b.id === word_id;
    });
    dispatch(deleteWord(word_index));
  };
};

// Reducer: 파라미터 자리에 = {} 주는 이유는, 빈 값일때 나는 오류 방지하기 위함
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "dictionary/LOAD": {
      return { list: action.word_list };
    }

    case "dictionary/CREATE": {
      const new_word_list = [...state.list];

      return { list: new_word_list };
    }

    case "dictionary/UPDATE": {
      const new_word_list = state.list.map((l, idx) => {
        if (action.word_index === idx) {
          if (l.done === false) {
            return { ...l, done: true };
          } else {
            return { ...l, done: false };
          }
        } else {
          return l;
        }
      });
      return { list: new_word_list };
    }

    case "dictionary/DELETE": {
      const new_word_list = state.list.filter((l, idx) => {
        // console.log(action.word_index !== idx, action.word_index, idx);
        return action.word_index !== idx;
      });
      return { list: new_word_list };
    }

    default:
      return state;
  }
}
