import React, { useContext, useState } from "react";
import styled from "@emotion/styled";
import { Context } from "../context";

const ExerciseCard = ({ name, workload, exerciseNum, angle }) => {
  const { theme } = useContext(Context);
  const [ isComplete, setComplete ] = useState(false);

  const handleCheckboxChange = (e) => {
    const checkboxList = e.currentTarget.parentElement.parentElement.parentElement
    const inputs = [...checkboxList.querySelectorAll('input')]
    const isCardComplete = inputs.every((box) => box.checked )

    // Adding the class like this because I
    // couldn't get it to conditionally render the class below
    // The component wasn't re-rendering when all boxes were checked
    // This causes a bug, where changing the theme will open up the closed exercise cards
    // TODO: REFACTOR ASAP
    if (isCardComplete) {
      setComplete((prev) => ( prev === true ))
      checkboxList.parentElement.classList.add('isComplete');
    }

  }

  return (
    <Card className={`${theme}-theme `}>
      <div className="card-header">
        <span className="exercise-number">{exerciseNum + 1}</span>
        <div className="card-details">
          <h3 className="name">{name}</h3>
          {/* <p className="angle">{angle}</p> */}
        </div>
      </div>
      <ul className="checkboxes">
        {workload.map((rep, i) => {
          return (
            <label className="checkbox set">
            <span className="checkbox__input">
              <input type="checkbox" name="checkbox" onChange={handleCheckboxChange}/>
              <span className="checkbox__control">
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
                  <path fill='none' stroke={theme === "dark" ? '#fff' : '#212125'} strokeWidth='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' />
                </svg>
              </span>
            </span>
            <span className="radio__label">{i + 1} - {rep} reps</span>
          </label>
          );
        })}
      </ul>
    </Card>
  );
};

export default ExerciseCard;
const Card = styled.div`
  display: inline-block;
  width: calc(100% - 15px);
  margin: 0 10px 10px;
  background-color: #fff;
  border-radius: 4px;
  z-index: 10;
  overflow: hidden;
  box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.07);

  @media only screen and (min-width: 700px) {
    width: calc(50% - 40px);
    margin: 0 10px 20px;
  }

  .card-header {
    position: relative;
    display: flex;
    border-bottom: 3px solid #41d3a2;
  }

  .exercise-number {
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #1b0c69;
    background-color: #41d3a2;
    font-weight: bold;
    padding: 15px;
    margin-bottom: -1px;
    border-top-left-radius: 4px;
    transition: font-size .2s, padding .2s;
    transition-delay: .5s;
  }

  .card-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px 15px 5px 5px;
  }

  .name {
    display: flex;
    align-self: center;
    font-size: 23px;
    text-transform: capitalize;
    transition: font-size .2s;
    transition-delay: .5s;
  }

  .angle {
    margin-top: 5px;
    margin-bottom: 0;
    font-style: italic;
    text-transform: capitalize;
  }

  .checkbox {
    display: grid;
    grid-template-columns: min-content auto;
    grid-gap: 0.5em;
    align-items: center;
    font-size: 20px;
    color: #212125;
    cursor: pointer;
    margin-bottom: 5px;
  }

  .checkbox__input {
    display: grid;
    grid-template-areas: "checkbox";

    > * { grid-area: checkbox; }

    input {
      opacity: 0;
      width: 1em;
      height: 1em;
    }
  }

  .checkbox__control {
    display: inline-grid;
    width: 1em;
    height: 1em;
    border-radius: 0.25em;
    border: 0.1em solid #212125;
  }

  .checkbox__control svg {
    transition: transform 0.1s ease-in 25ms;
    transform: scale(0);
    transform-origin: bottom left;
  }

  .checkbox__input input:checked
  + .checkbox__control svg { transform: scale(1); }

  .checkbox__input input:focus
  + .checkbox__control {
    box-shadow: 0 0 0 0.05em #41d3a2, 0 0 0.15em 0.1em #41d3a2;
  }

  .checkboxes {
    max-height: 500px;
    transition: max-height .6s, margin-top .6s, margin-bottom .6s;
  }

  &.isComplete {
    .checkboxes {
      max-height: 0;
      margin-top: 0;
      margin-bottom: 0;
    }

    .exercise-number {
      padding: 5px 15px;
      font-size: 16px;
      transition: background-color .2s;
      background-color: #bb86fc;
    }

    .card-header { border-bottom: 3px solid #bb86fc; }

    &.dark-theme {
      .exercise-number { background-color: #41d3a2; }
      .card-header { border-bottom: 3px solid #41d3a2; }
      .name { font-size: 16px; }
    }

    @media only screen and (max-width: 700px) {
      order: -1;
      transition: order .2s;
      transition-delay: 1s;
    }

    @media only screen and (min-width: 700px) {
      float: left;
    }
  }

  &.dark-theme {
    background-color: #212125;

    .name,
    .angle { color: #fff; }

    .card-header { border-bottom: 3px solid #bb86fc; }

    .exercise-number {
      background-color: #bb86fc;
      color: #212125;
    }

    .set { color: #fff; }

    .checkbox { color: #fff; }

    .checkbox__control { border: 0.1em solid #fff; }

    .checkbox__input input:focus
    + .checkbox__control {
      box-shadow: 0 0 0 0.05em #fff, 0 0 0.15em 0.1em #fff;
    }
  }
`;
