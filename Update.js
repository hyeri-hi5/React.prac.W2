import { useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateWordFB } from "./redux/modules/dictionary";

import styled from "styled-components";

import { db } from "./Firebase";
import { collection, getDoc, getDocs } from "firebase/firestore";

function Update(props) {
  const params = useParams();
  const history = useHistory();

  const wInput = useRef();
  const mInput = useRef();
  const eInput = useRef();

  const dispatch = useDispatch();

  const word_list = useSelector((state) => state.dictionary.list);

  const card = word_list.filter((a) => {
    return a.id === params.id;
  });

  console.log(card);

  //   const word_index = word_list.findIndex((b) => {
  //     return b.id === params.id;
  //   });

  console.log(word_list[0].id);

  const updateWord = () => {
    const updatedContents = {
      word: wInput.current.value,
      mean: mInput.current.value,
      ex: eInput.current.value,
      id: params.id,
    };
    // dispatch(updateWordFB(updatedCard));
    history.push(`/`);
  };

  // const [inputs, setInpust] = useState({
  //   word: '', mean: '', ex: ''
  // });

  // const {word, mean, ex} = inputs; // 비구조화 할당을 통해 값 추출

  // const onChange = (e) => {
  //   const{name, value}  = e.target; // e.target에서 name과 value를 추출
  //   setInputs({...inputs, [name]: value}); //기존의 input 객체 deep copy한 뒤 name키를 가진 value로 설정
  // };

  return (
    <Modal>
      <h2> 단어 수정하기 </h2>
      <div>
        <h4>
          단어
          <input type={"text"} ref={wInput} value={card[0].word} />
        </h4>
        <h4>
          뜻 <input type={"text"} ref={mInput} value={card[0].mean} />
        </h4>
        <h4>
          예시 <input type={"text"} ref={eInput} value={card[0].ex} />
        </h4>
      </div>

      <div>
        {/* <button onClick={updateWord}>수정</button> */}
        <button
          onClick={() => {
            history.push("/");
          }}
        >
          취소
        </button>
      </div>
    </Modal>
  );
}

const Modal = styled.div`
  width: 350px;
  height: 300px;
  padding: 20px;
  margin: 50px auto;
  background: white;
  border: 5px solid #e89177;
  box-shadow: 0 5px 18px -7px rgba(0, 0, 0, 0.5);
  border-radius: 18px;
  font-family: "SuncheonB";
  h2 {
    margin: 10px 0 20px 0;
  }
  h4 {
    width: 50px;
    text-align: left;
    font-weight: 550;
    margin: 10px 0;
  }
  input {
    margin: 10px 0 0 25px;
    width: 300px;
    height: 15px;
    padding: 5px;
    border: 1px solid #dadafc;
    border-radius: 30px;
  }
  button {
    margin: 20px 30px;
    padding: 10px;
    background-color: #e89177;
    border: 1px solid #e89177;
    color: white;
    font-weight: 500;
    border-radius: 30px;
    font-family: "SuncheonB";
    cursor: pointer;
  }
`;

export default Update;
