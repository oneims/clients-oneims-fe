import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";

export const Input = ({
  label,
  name,
  autoComplete,
  placeholder,
  type,
  required,
  register,
  errors,
  validations,
}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        aria-labelledby={name}
        autoComplete={autoComplete}
        type={type}
        placeholder={placeholder}
        required={required}
        {...register(name, {
          ...validations,
        })}
      />
      {errors && errors[name] && (
        <div className="THEME__font-size-0n8 THEME__text-danger mt-2">
          <span>{errors[name]?.message}</span>
        </div>
      )}
    </>
  );
};

export const Repeater = ({
  id,
  register,
  errors,
  repeaterElements,
  repeaterIndex,
  repeaterName,
  control,
}) => {
  return (
    <>
      {repeaterElements &&
        repeaterElements.map((elem, index) => {
          const {
            name,
            type,
            label,
            element,
            required,
            validations,
            autoComplete,
            placeholder,
            options,
          } = elem;
          return (
            <React.Fragment key={index}>
              <div className="MODULE__repeater-field__column">
                <div className="MODULE__repeater-field__item">
                  {element === `input` && (
                    <>
                      <label htmlFor={`${name}.${id}`}>{label}</label>
                      <input
                        id={`${name}.${id}`}
                        name={`${name}.${id}`}
                        aria-labelledby={`${name}.${id}`}
                        autoComplete={autoComplete}
                        type={type}
                        placeholder={placeholder}
                        required={required}
                        control={control}
                        {...register(`${repeaterName}.${repeaterIndex}.${name}`, {
                          ...validations,
                        })}
                      />
                      {errors &&
                        errors[repeaterName] &&
                        errors[repeaterName][repeaterIndex] &&
                        errors[repeaterName][repeaterIndex][name] && (
                          <div className="THEME__font-size-0n8 THEME__text-danger mt-2">
                            <span>{errors[repeaterName][repeaterIndex][name]?.message}</span>
                          </div>
                        )}
                    </>
                  )}
                  {element === `select` && (
                    <>
                      <label htmlFor={`${name}.${id}`}>{label}</label>
                      <Controller
                        id={`${name}.${id}`}
                        name={`${name}.${id}`}
                        aria-labelledby={`${name}.${id}`}
                        autoComplete={autoComplete}
                        type={type}
                        placeholder={placeholder}
                        required={required}
                        control={control}
                        {...register(`${repeaterName}.${repeaterIndex}.${name}`, {
                          ...validations,
                        })}
                        ref={null}
                        render={({ field: { onChange, value, ref } }) => (
                          <Select
                            className="MODULE__select-container"
                            options={options}
                            classNamePrefix="MODULE__select"
                            value={options.find((elem) => elem.value === value)}
                            onChange={(elem) => onChange(elem.value)}
                            isSearchable={true}
                            // menuIsOpen
                          />
                        )}
                      />
                      {errors &&
                        errors[repeaterName] &&
                        errors[repeaterName][repeaterIndex] &&
                        errors[repeaterName][repeaterIndex][name] && (
                          <div className="THEME__font-size-0n8 THEME__text-danger mt-2">
                            <span>{errors[repeaterName][repeaterIndex][name]?.message}</span>
                          </div>
                        )}
                    </>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}
    </>
  );
};
