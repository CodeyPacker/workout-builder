import React, { useContext } from "react";
import { Context } from "../context";
import ExerciseCard from "./ExerciseCard";
import styled from "@emotion/styled";

const GenerateWorkout = () => {
  const { activeExercises, goal } = useContext(Context);

  return (
    <Exercises>
      {activeExercises.map((ex, i) => {
        return (
          <ExerciseCard
            name={ex.name}
            workload={ex[goal]}
            exerciseNum={i}
            angle={ex.angle}
          />
        );
      })}
    </Exercises>
  );
};

export default GenerateWorkout;

const Exercises = styled.section`
  max-width: 875px;
  margin: auto;

  @media only screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
  }
`;
