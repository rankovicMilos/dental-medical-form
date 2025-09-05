// src/form/FormRenderer.tsx
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { sections, fields, questions } from "./formSchema";
import { useTranslation } from "react-i18next";
import { QuestionRenderer } from "./QuestionRenderer";
import { FieldRenderer } from "./FieldRenderer";
import Signature from "@uiw/react-signature";
import "../App.css";

interface FormData {
  [key: string]: string | boolean | string[] | undefined;
  signature?: string;
}

export const FormRenderer: React.FC = () => {
  const { t } = useTranslation("form");
  const { register, handleSubmit, watch } = useForm<FormData>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sigCanvas = useRef<any>(null);
  const handleClearSignature = () => sigCanvas.current?.clear?.();

  // Watch all form values for debugging
  const watchedValues = watch();
  console.log("Current form values:", watchedValues);

  const onSubmit = (formData: FormData) => {
    console.log("Submitting formData:", formData);
    // Add signature data if available
    if (sigCanvas.current?.toDataURL) {
      formData.signature = sigCanvas.current.toDataURL();
    }
    // ...post formData somewhere
  };

  return (
    <form className="conf-card conf-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="conf-section">
        {sections.map((section) => (
          <section id={section.id} key={section.id}>
            <div className="conf-section-head">
              <h2 className="conf-section-title">
                {t(`sections.${section.id}`)}
              </h2>
            </div>

            <div className="conf-grid">
              {/* Fields */}
              {section.fieldIds?.map((fId) => {
                const field = fields.find((f) => f.id === fId);
                return field ? (
                  <div key={field.id}>
                    <FieldRenderer field={field} register={register} />
                  </div>
                ) : null;
              })}

              {/* Questions */}
              {section.questionIds.map((qId) => {
                const question = questions.find((q) => q.id === qId);
                return question ? (
                  <div key={question.id} className="mb-3">
                    <QuestionRenderer question={question} register={register} />
                  </div>
                ) : null;
              })}

              {section.id === "consent" && (
                <div className="conf-consent">
                  <div className="conf-consent-text">
                    <label className="conf-label">
                      <input
                        {...register("hipaaConsent", { required: true })}
                        type="checkbox"
                        className="conf-checkbox"
                      />
                      <span>{t("consent.hipaa")}</span>
                    </label>

                    <label className="conf-label">
                      <input
                        {...register("treatmentConsent", { required: true })}
                        type="checkbox"
                        className="conf-checkbox"
                      />
                      <span>{t("consent.treatment")}</span>
                    </label>
                    <p className="conf-consent-note">*{t("consent.note")}</p>
                    <br />
                    <p className="conf-consent-note">*{t("consent.note2")}</p>
                  </div>

                  <div className="conf-signature-container">
                    <div className="conf-signature">
                      <Signature
                        ref={sigCanvas}
                        options={{
                          size: 3,
                          smoothing: 0.46,
                          thinning: 0.73,
                          streamline: 0.5,
                          start: {
                            taper: 0,
                            cap: true,
                          },
                          end: {
                            taper: 0,
                            cap: true,
                          },
                        }}
                      />
                      <br />
                    </div>
                    <button
                      type="button"
                      className="conf-btn conf-btn-dark"
                      onClick={handleClearSignature}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        ))}

        <div className="flex gap-3">
          <div className="conf-actions">
            <button
              type="submit"
              className="btn btn-primary button primary-btn conf-btn conf-btn-primary conf-btn-lg"
            >
              {t("buttons.submit")}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
