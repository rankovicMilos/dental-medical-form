// src/form/FieldRenderer.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import type { UseFormRegister, FieldValues } from "react-hook-form";
import type { Field } from "./formSchema";
import "../App.css";

interface Props {
  field: Field;
  register: UseFormRegister<FieldValues>;
}

export const FieldRenderer: React.FC<Props> = ({ field, register }) => {
  const { t } = useTranslation("form");

  const label = t(`fields.${field.id}.label`);
  const placeholder = field.placeholderKey
    ? t(field.placeholderKey)
    : undefined;

  switch (field.type) {
    case "text":
    case "email":
    case "tel":
    case "date":
    case "number":
      return (
        <div className="conf-field">
          <label htmlFor={field.id} className="conf-label">
            {label}
            {field.required && <span className="text-red-500">*</span>}
          </label>
          <input
            {...register(field.id, { required: field.required })}
            type={field.type}
            placeholder={placeholder}
            className="conf-input"
            id={field.id}
          />
        </div>
      );

    case "checkbox":
      return (
        <div className="conf-field">
          <label htmlFor={field.id} className="conf-label">
            <input
              {...register(field.id, { required: field.required })}
              type="checkbox"
              className="conf-checkbox"
              id={field.id}
            />
            {label}
            {field.required && <span className="text-red-500">*</span>}
          </label>
        </div>
      );

    default:
      return null;
  }
};
