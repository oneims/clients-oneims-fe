import React from "react";
import Button from "@/components/core/Button";
import { Input, Repeater } from "@/components/core/FormElements";

const Form = ({
  onSubmit,
  schema,
  register,
  errors,
  isDirty,
  isValid,
  isLoading,
  errorMessage,
  successMessage,
  fields,
  control,
  append,
  remove,
}) => {
  return (
    <>
      <form className="MODULE__form" onSubmit={onSubmit}>
        {schema?.fields.map((elem, index) => {
          const { group } = elem;
          return (
            <div key={index}>
              {group && group.length > 0 ? (
                <div className="MODULE__form__grouped-fields MODULE__form__grouped-fields-two-col">
                  {elem.group.map((elem2) => {
                    return (
                      <div className="MODULE__form__field" key={elem2.name}>
                        {elem2.element === `input` && (
                          <>
                            <Input
                              label={elem2.label}
                              name={elem2.name}
                              aria-labelledby={elem2.name}
                              autoComplete={elem2.autoComplete}
                              type={elem2.type}
                              validations={elem2.validations}
                              register={register}
                              errors={errors}
                            />
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="MODULE__form__field" key={elem.name}>
                  {elem.element === `input` && (
                    <>
                      <Input
                        label={elem.label}
                        id={elem.name}
                        name={elem.name}
                        aria-labelledby={elem.name}
                        autoComplete={elem.autoComplete}
                        type={elem.type}
                        placeholder={elem.placeholder}
                        validations={elem.validations}
                        register={register}
                        errors={errors}
                      />
                    </>
                  )}
                  {elem.element === `repeater` && (
                    <>
                      {elem.title && (
                        <div className="mb-3 mt-5">
                          <span className="d-block THEME__f-700">{elem.title}</span>
                          {elem.description && <span className="">{elem.description}</span>}
                          {fields.length > 0 && (
                            <span className="d-block THEME__font-size-0n8 THEME__f-600">
                              {fields.length === 1
                                ? `${fields.length} item added`
                                : `${fields.length} items added`}
                            </span>
                          )}
                        </div>
                      )}

                      {fields.map((elem2, index2) => {
                        return (
                          <div key={elem2.id} className="mt-3 MODULE__repeater-field">
                            <div className="MODULE__repeater-field__delete-wrapper">
                              <figure
                                className="MODULE__repeater-field__delete"
                                onClick={() => remove(index2)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                                  />
                                </svg>
                              </figure>
                            </div>
                            <div className="MODULE__repeater-field__wrapper">
                              <Repeater
                                id={elem2.id}
                                repeaterIndex={index2}
                                repeaterElements={elem.repeaterElements}
                                repeaterName={elem.name}
                                register={register}
                                errors={errors}
                                control={control}
                              />
                            </div>
                          </div>
                        );
                      })}
                      <div className="text-end mt-3">
                        <div className="MODULE__repeater-field__add">
                          <Button
                            className="THEME__font-size-0n8"
                            onClick={() => {
                              const repeaterFields = elem.repeaterElements;
                              const obj = {};
                              repeaterFields.forEach((elem2) => {
                                const name = elem2.name;
                                obj[name] = "";
                              });
                              append(obj);
                            }}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {schema?.button?.title && (
          <Button
            wrapperClassName="mt-4 pt-3"
            type={schema.button.type}
            className={schema.button.className + ``}
            variant={schema.button.variant}
            disabled={!isDirty || !isValid}
            isLoading={isLoading}
          >
            {schema.button.title}
          </Button>
        )}
        {errorMessage && (
          <div
            className="MODULE__form__message-error THEME__font-size-0n9 mt-5 text-center"
            role="alert"
          >
            <span>{errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div
            className="MODULE__form__message-success text-center THEME__font-size-0n9 mt-5"
            role="alert"
          >
            <div>
              <span>{successMessage}</span>
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default Form;
