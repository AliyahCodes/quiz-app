import { useState, useRef } from "react"; 
import Swal from "sweetalert2";
import { data } from "./assets/data";
import CountDown from "./Components/CountDown";

export default function App() {
  let [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  const [score,setScore] = useState(0);
  const [result, setResult] = useState(false);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_array = [Option1, Option2, Option3, Option4];

  const cekAns = (e, answer) => {
    if (lock === false) {
      if (question.answer === answer) {
        e.target.classList.add("correct");
        setLock(true);
        setScore(prev=>prev+1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.answer - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock) { // Cek apakah user sudah memilih jawaban
      if (index === data.length - 1) {  // Jika sudah di pertanyaan terakhir
        setResult(true);
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Your score is ${score} out of ${data.length}`,
          html: score >= 21 ? "<b>Great job!</b>🔥<br>You're a pro! Let’s start over!<br>👇" : "<b>Nice try!</b>🙌 <br>but there’s room for improvement! <br>Let’s start over!<br>👇",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            
            reset(); // Reset quiz jika user klik "OK"
          }
        });
        return;
      }
      // Pindah ke pertanyaan berikutnya
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);// Reset lock
      // Reset tampilan pilihan
      option_array.map((option) => {
        if (option?.current) {
          option.current.classList.remove("correct");
          option.current.classList.remove("wrong");
        }
      });
    }
  }

  const reset = () => {
    setIndex(0); // Reset ke pertanyaan pertama
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    option_array.map((option) => {
      if (option?.current) {
        option.current.classList.remove("correct");
        option.current.classList.remove("wrong");
      }});
  }
  return (

    <div className="container" >
      <header className="header">
        <h2>Quiz App Programmer Test</h2>
        <div className="header-info">
          <CountDown seconds={180} />
          <span>Question {index + 1}/{data.length}</span>
        </div>
      </header>
  
      <div className="quiz-container">
          <div className="question-section">
            <h3>Question</h3>
            <p>
              {index + 1}. {question.question}
            </p>
          </div>
   
          <div className="answer-section">
            <h4>Select only one answer</h4>
            <ul className="choices">
              <li ref={Option1} onClick={(e) => cekAns(e, 1)}>
               A. {question.option1}
              </li>
              <li ref={Option2} onClick={(e) => cekAns(e, 2)}>
                B. {question.option2}
              </li>
              <li ref={Option3} onClick={(e) => cekAns(e, 3)}>
                C. {question.option3}
              </li>
              <li ref={Option4} onClick={(e) => cekAns(e, 4)}>
                D. {question.option4}
              </li>
            </ul>
            <button onClick={next} type="button">
              {index === data.length - 1 ? 'Finish' : 'Next'}
            </button>
            
          </div>    
          
        </div>
    </div>
  );
}
