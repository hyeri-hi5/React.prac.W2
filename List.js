import { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  updateWord,
  deleteWord,
  loadWordFB,
  checkWordFB,
  deleteWordFB,
} from "./redux/modules/dictionary";

import { db } from "./Firebase";
import { collection, getDoc, getDocs } from "firebase/firestore";

import { BsPatchPlusFill } from "react-icons/bs";
import { AiOutlineCloseSquare, AiOutlineCheckSquare } from "react-icons/ai";

function List(props) {
  // const { word, mean, ex } = inputs; //비구조화 할당을 통해 값 추출?

  // const onChange = (e) => {
  //   const { word, mean, ex } = e.target;
  //   setInputs({ ...inputs, [word]: value });
  // };
  //  let [word, setWord] = useState(["Apple", "Banana"]);
  // let [mean, setMean] = useState(["사과", "바나나"]);
  // let [ex, setEx] = useState(["I like apple", "I don't like banana"]);

  const dispatch = useDispatch();
  // LOAD 불러오기
  useEffect(() => {
    dispatch(loadWordFB());
  }, []);

  const history = useHistory();

  // useEffect(async () => {
  //   console.log(db);
  //   const query = await getDocs(collection(db, "word"));
  //   console.log(query);
  //   query.forEach((doc) => {
  //     console.log(doc.id, doc.data());
  //   });
  // }, []);

  const my_list = useSelector((state) => state.dictionary.list);

  return (
    <>
      <CardList>
        {my_list.map((word, i) => {
          return (
            <Card
              done={word.done}
              onClick={() => {
                history.push(`/update/${my_list[i].id}`);
              }}
            >
              <Word key={i}>
                <h2>{word.word} </h2>
                <hr
                  style={{
                    backgroundColor: "#9d9d9d",
                    border: "1px solid #9d9d9d",
                  }}
                />
                <h3>[{word.mean}]</h3>
                <h3 style={{ color: "blue" }}>{word.ex}</h3>
              </Word>
              <div className="buttonPac" style={{ margin: "10px 0 0 20px" }}>
                <AiOutlineCheckSquare
                  onClick={() => {
                    // dispatch(updateWord(i));
                    dispatch(checkWordFB(my_list[i].id));
                  }}
                  style={{ cursor: "pointer" }}
                  size="18"
                  color="#e89177"
                />
                <AiOutlineCloseSquare
                  onClick={() => {
                    // dispatch(deleteWord(i));
                    dispatch(deleteWordFB(my_list[i].id));
                  }}
                  style={{ cursor: "pointer", right: "0px" }}
                  size="18"
                  color="#e89177"
                />
              </div>
            </Card>
          );
        })}
      </CardList>
      <BsPatchPlusFill
        onClick={() => {
          history.push("/addword");
        }}
        style={{
          position: "fixed",
          bottom: "0px",
          right: "0px",
          margin: "10px 10px ",
          padding: "10px",
          cursor: "pointer",
        }}
        size="60"
        color="#e89177"
        border="1px solid black"
      />
    </>
  );
}

const CardList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 90%;
  height: 80%;
  max-height: 80vh;
  overflow-y: auto;
  margin: 0 180px;
`;

const Card = styled.div`
  display: flex;
  width: 250px;
  height: 160px;
  margin: 20px 10px 5px 20px;
  border: 5px solid ${(props) => (props.done ? "#e89177" : "white")};
  box-shadow: 0 5px 18px -7px rgba(0, 0, 0, 0.5);
  border-radius: 18px;
`;

const Word = styled.div`
  width: 170px;
  height: 150px;
  text-align: left;
  padding-left: 13px;
  font-family: "SuncheonB";
  h2 {
    color: ${(props) => (props.done ? "white" : "black")};
  }
  h3 {
    margin: 22px 0;
  }
`;

export default List;
