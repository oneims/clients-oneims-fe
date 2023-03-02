import React from "react";
import Button from "@/components/core/Button";

const SimpleTable = ({ columns, data, options }) => {
  return (
    <div className="MODULE__table-v2__wrapper">
      <table className="table MODULE__table-v2">
        <thead className="THEME__text-light">
          <tr>
            {columns.map((elem) => {
              return (
                <th key={elem.key} className={`col-${elem.width}`} scope="col">
                  {elem.label}
                </th>
              );
            })}
            {options.enableButtonColumn && (
              <th className={`col-${options?.buttonColumnWidth}`} scope="col"></th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 && (
            <>
              {data.map((elem, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr className="THEME__font-size-0n9">
                      <React.Fragment key={index}>
                        {columns.map((header, index) => {
                          return (
                            <React.Fragment key={index}>
                              <td className="align-middle" key={index}>
                                {elem[header.key]}
                              </td>
                            </React.Fragment>
                          );
                        })}
                      </React.Fragment>
                      {options.enableButtonColumn && (
                        <td className="align-middle">
                          <Button
                            destination={elem.buttonOptions?.destination}
                            variant="ghost-bw"
                            className="THEME__font-size-0n8 py-2"
                          >
                            {elem.buttonOptions?.label}
                          </Button>
                        </td>
                      )}
                    </tr>
                  </React.Fragment>
                );
              })}
            </>
          )}
          {data.length === 0 && (
            <tr className="THEME__font-size-0n9">
              <td>No client users found..</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleTable;

SimpleTable.defaultProps = {
  options: {
    enableButtonColumn: false,
    buttonColumnWidth: 0,
  },
  columns: [
    {
      label: "Project Name",
      key: "projectName",
      width: "12",
    },
  ],
  data: [
    {
      projectName: "JKE Law",
    },
    {
      projectName: "Lola Valentina",
    },
  ],
};
