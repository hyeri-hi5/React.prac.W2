import styled from "styled-components";
import { useSelector } from "react-redux";

const Progress = (props) => {
  const word_list = useSelector((state) => state.dictionary.list);

  let count = 0;
  word_list.map((word, idx) => {
    if (word.done) {
      count++;
    }
  });

  return (
    <ProgressBar>
      <Highlight width={(count / word_list.length) * 100 + "%"} />
      <Circle />
    </ProgressBar>
  );
};

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #eee;
  width: 80%;
  height: 20px;
  margin: 14px auto;
  border-radius: 10px;
`;

const Highlight = styled.div`
  background-color: #673ab7;
  transition: 1s;
  width: ${(props) => props.width};
  height: 20px;
  border-radius: 10px;
`;

const Circle = styled.div`
  width: 30px;
  height: 30px;
  background-color: white;
  border: 5px solid #673ab7;
  border-radius: 40px;
  margin: -5px 0 0 -20px;
`;

export default Progress;
