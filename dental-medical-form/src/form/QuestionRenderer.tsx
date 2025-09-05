// src/form/QuestionRenderer.tsx
import React from "react";
import type { UseFormRegister, FieldValues } from "react-hook-form";
import type { Question } from "./formSchema";
import { useTranslation } from "react-i18next";
import "../App.css";

interface Props {
  question: Question;
  register: UseFormRegister<FieldValues>;
}

export const QuestionRenderer: React.FC<Props> = ({ question, register }) => {
  const { t } = useTranslation("form");

  const qLabel = t(`question.${question.id}`);

  if (question.type === "boolean") {
    return (
      <div className="conf-field">
        <label htmlFor={question.id} className="conf-label">
          <input
            {...register(question.id)}
            type="checkbox"
            className="conf-checkbox"
            id={question.id}
          />
          {qLabel}
        </label>
      </div>
    );
  }

  if (question.type === "multi") {
    return (
      <fieldset>
        <legend>{qLabel}</legend>
        {question.answerIds.map((aId) => (
          <label htmlFor={aId} key={aId} className="conf-label">
            <input
              {...register(question.id)}
              type="checkbox"
              className="conf-checkbox"
              value={aId} // value identifies the choice
              id={aId}
            />{" "}
            {t(`answer.${aId}`)}
          </label>
        ))}
      </fieldset>
    );
  }

  if (question.type === "single") {
    return (
      <fieldset>
        <legend>{qLabel}</legend>
        {question.answerIds.map((aId) => (
          <label
            htmlFor={`${question.id}-${aId}`}
            key={aId}
            className="conf-label"
          >
            <input
              {...register(question.id)}
              type="radio"
              value={aId} // each radio carries its own value
              id={`${question.id}-${aId}`}
            />{" "}
            {t(`answer.${aId}`)}
          </label>
        ))}
      </fieldset>
    );
  }

  if (question.type === "text" || question.type === "number") {
    return (
      <div className="conf-field">
        <label htmlFor={question.id} className="conf-label">
          {qLabel}
        </label>
        <input
          {...register(question.id)}
          type={question.type === "number" ? "number" : "text"}
          className="conf-input"
          id={question.id}
        />
      </div>
    );
  }

  return null;
};
