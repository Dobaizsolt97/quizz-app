import React from "react";
import ReactDom from "react-dom";
import "../src/index.css";
import quizzService from "./quizService";
import QuestionBox from "./components/questionBox";
import Result from "./components/result";

class QuizzApp extends React.Component {
  state = {
    questionBank: [],
    score: 0,
    responses: 0
  };
  getQuestions = () => {
    quizzService().then(question => {
      this.setState({
        questionBank: question
      });
    });
  };
  componentDidMount() {
    this.getQuestions();
  }
  playAgain = () => {
    this.getQuestions();
    this.setState({
      score: 0,
      responses: 0
    });
  };
  computeAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      this.setState({
        score: this.state.score + 1
      });
    }

    this.setState({
      responses: this.state.responses < 5 ? this.state.responses + 1 : 5
    });
  };
  render() {
    return (
      <div className="container">
        <div className="title">Quizz app</div>
        {this.state.questionBank.length > 0 &&
          this.state.responses < 5 &&
          this.state.questionBank.map(
            ({ question, answers, correct, questionId }) => (
              <QuestionBox
                key={questionId}
                questions={question}
                options={answers}
                selected={answer => this.computeAnswer(answer, correct)}
              />
            )
          )}
        {this.state.responses === 5 ? (
          <Result score={this.state.score} playAgain={this.playAgain} />
        ) : null}
      </div>
    );
  }
}

ReactDom.render(<QuizzApp />, document.getElementById("root"));
