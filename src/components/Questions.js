import React, { useContext } from "react";
import { Context } from "../context";
import styled from "@emotion/styled";
import heartLight from "../images/heart-light.svg";
import heartDark from "../images/heart-dark.svg";

const Questions = () => {
  const {
    theme,
    handleGoal,
    step,
    handleMuscle,
    submitMuscles,
    handleEquipment,
    handleBeginWorkout,
  } = useContext(Context);

  return (
    <QuestionsWrapper className={`${theme}-theme `}>
      <div className={`whats-your-goal ${step !== "choose-goal" && "hide"}`}>
        <h2 className="heading center-text">What's your goal?</h2>
        <div className="question-flex-container">
          <button onClick={() => handleGoal("hypertrophy")}>
            Build Muscle
          </button>
          <button onClick={() => handleGoal("strength")}>Build Strength</button>
        </div>
      </div>

      <div
        className={`multiple-choice what-muscles ${step !== "choose-muscles" ? "hide" : ""}`}
      >
        <h2 className="heading center-text">What muscles?</h2>
        <form className="question-flex-container">
          {/* <input className="muscle-checkbox" type="checkbox" onChange={() => handleMuscle('biceps')} id="biceps"/>
          <label htmlFor="biceps">Biceps</label> */}
          <input
            className="muscle-checkbox"
            type="checkbox"
            onChange={() => handleMuscle("chest")}
            id="chest"
          />
          <label htmlFor="chest">Chest</label>
          <input
            className="muscle-checkbox"
            type="checkbox"
            onChange={() => handleMuscle("back")}
            id="back"
          />
          <label htmlFor="back">Back</label>
          {/* <input
            className="muscle-checkbox"
            type="checkbox"
            onChange={() => handleMuscle("triceps")}
            id="triceps"
          />
          <label htmlFor="triceps">Triceps</label> */}
          {/* <input className="muscle-checkbox" type="checkbox" onChange={() => handleMuscle('triceps')} id="triceps"/>
          <label htmlFor="triceps">Triceps</label>
          <input className="muscle-checkbox" type="checkbox" onChange={() => handleMuscle('shoulders')} id="shoulders"/>
          <label htmlFor="shoulders">Shoulders</label>
          <input className="muscle-checkbox" type="checkbox" onChange={() => handleMuscle('legs')} id="legs"/>
          <label htmlFor="legs">Legs</label> */}
        </form>
        <div className="begin-workout-wrapper">
          <button className="begin-workout" onClick={submitMuscles}>
            Choose equipment!
          </button>
        </div>
      </div>

      {/* Body building - Choose equipment */}
      <div
        className={`multiple-choice ${
          step !== "select-muscle-equipment" ? "hide" : ""
        }`}
      >
        <h2 className="heading center-text">
          Available equipment:
        </h2>
        <form className="question-flex-container">
          <input
            className="muscle-checkbox"
            type="checkbox"
            onChange={() => handleEquipment("gym")}
            id="gym"
          />
          <label htmlFor="gym">Full gym</label>
          <input
            className="muscle-checkbox"
            type="checkbox"
            onChange={() => handleEquipment("dumbbells")}
            id="dumbbells"
          />
          <label htmlFor="dumbbells">Dumbbells</label>
        </form>
        <div className="begin-workout-wrapper">
          <button className="begin-workout" onClick={handleBeginWorkout}>
            Begin workout!
          </button>
        </div>
      </div>

      {/* Lose weight - Choose equipment */}
      <div
        className={`multiple-choice ${
          step !== "lose-weight-equipment" ? "hide" : ""
        }`}
      >
        <h2 className="heading center-text">
          What equipment do you have access to?
        </h2>
        <form className="question-flex-container">
          <input
            className="muscle-checkbox"
            type="checkbox"
            onChange={() => handleEquipment("jumprope")}
            id="jumprope"
          />
          <label htmlFor="jumprope">Jump rope</label>
          <input
            className="muscle-checkbox"
            type="checkbox"
            onChange={() => handleEquipment("body-weight")}
            id="body-weight"
          />
          <label htmlFor="body-weight">Body weight</label>
        </form>
        <div className="begin-workout-wrapper">
          <button className="begin-workout" onClick={handleBeginWorkout}>
            Begin workout!
          </button>
        </div>
      </div>
    </QuestionsWrapper>
  );
};

export default Questions;

const QuestionsWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;

  .heading {
    margin: 0 auto 40px;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    max-width: 500px;

    &::before {
      content: "";
      height: 2px;
      width: 100%;
      margin-right: 20px;
      background-color: #bb86fc;
      ${'' /* background: linear-gradient(30deg,#d367c1 10%,#dedf40 25%,#62cb5c 50%,#00bbcb 75%,#ab79d6 90%); */}
    }

    &::after {
      content: "";
      margin-left: 20px;
      height: 2px;
      width: 100%;
      background-color: #bb86fc;
      ${'' /* background: linear-gradient(30deg,#d367c1 10%,#dedf40 25%,#62cb5c 50%,#00bbcb 75%,#ab79d6 90%); */}
    }
  }

  .question-flex-container {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .begin-workout-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .muscle-checkbox {
    opacity: 0;
    width: 0;
    margin: 0;
  }

  .whats-your-goal {
    button {
      width: 70%;

      @media only screen and (min-width: 700px) {
        width: calc(50% - 60px);
      }
    }
  }

  .what-muscles {
    label {
      width: calc(50% - 60px);
    }
  }

  ${"" /* Initialize height at 0 to create a transition effect */}
  button,
  .muscle-checkbox + label {
    padding: 20px;
    background-color: #41d3a2;
    color: #1b0c69;
    border: 3px solid #41d3a2;
    font-size: 32px;
    font-weight: 700;
    cursor: pointer;
    text-align: center;
    margin: 0 15px 25px;
    border-radius: 4px;
    border-bottom: 3px solid #41d3a2;
    transition: border .2s;

    &:hover,
    &:focus {
      background-color: transparent;
      border: 3px solid #1b0c69;
    }

    @media only screen and (max-width: 600px) {
      display: inline-block;
      font-size: 25px;
    }

    &:after {
      content: "";
      width: 0;
      transition: width 0.2s, min-height 0.2s;
    }
  }

  .muscle-checkbox:checked + label {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: 3px solid #1b0c69;

    &:after {
      transition: width 0.2s, height 0.2s;
      content: url("${heartLight}");
      width: 28px;
      margin-left: 5px;

      @media only screen and (max-width: 600px) {
        width: 21px;
      }
    }
  }

  .begin-workout {
    border: 3px solid #fff;
    border-bottom: 3px solid #bb86fc;
    background-color: white;
    font-size: 24px;
    margin-top: 15px;

    &:hover {
      background-color: white;
      border: 3px solid #bb86fc;
    }
  }

  &.dark-theme {
    .heading {
      color: #f4f4f4;

        &::before { background-color: #41d3a2; }
        &::after { background-color: #41d3a2; }
      }

    button,
    .muscle-checkbox + label {
      background-color: #212125;
      color: #f4f4f4;
      border: 3px solid #212125;
      border-bottom: 3px solid #bb86fc;
      transition: border .2s;

      &:hover,
      &:focus {
        background-color: transparent;
        border: 3px solid #bb86fc;
      }
    }

    .muscle-checkbox:checked + label {
      background-color: transparent;
      border: 3px solid #bb86fc;

      &:after { content: url("${heartDark}"); }
    }

    .begin-workout {
      border-bottom: 3px solid #41d3a2;

      &:hover,
      &:focus {
        background-color: transparent;
        border: 3px solid #41d3a2;
      }
    }
  }
`;
