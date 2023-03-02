import React from "react";
import Dashboard from "@/components/wrappers/Dashboard";
import Spinner from "@/components/core/Spinner";
import Skeleton from "react-loading-skeleton";
import Section from "@/components/wrappers/Section";
import ProtectedRoute from "@/lib/ProtectedRoute";
import Container from "@/components/wrappers/Container";
import { useProjectsFromBasecampGET } from "@/lib/Fetcher";
import { useAppContext } from "@/context/AppWrapper";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import SimpleTable from "@/components/core/SimpleTable";

const BasecampProjectsIndex = () => {
  const { user } = useAppContext();
  const router = useRouter();
  const { data, isLoading, isError } = useProjectsFromBasecampGET(user?.token);
  let table = {
    options: {
      enableButtonColumn: true,
      buttonColumnWidth: 0,
    },
    columns: [
      {
        key: "projectName",
        label: "Project Name",
        width: 7,
      },
      {
        key: "projectId",
        label: "Project ID",
        width: 5,
      },
    ],
    data: null,
  };
  if (data) {
    const tableData = data.data.map((elem) => {
      return {
        projectName: elem.name,
        projectId: elem.id,
        buttonOptions: {
          label: "View",
          destination: `${router.asPath}/${elem.id}`,
        },
      };
    });
    table.data = tableData;
  }

  return (
    <ProtectedRoute>
      <NextSeo title={`All Basecamp Projects | Clients OneIMS`} />
      <Dashboard>
        <Section className="THEME__bg-app-light BLOCK__small THEME__border-bottom">
          <Container>
            <div className="text-center">
              <h1 className="h3 mb-0">Basecamp Projects</h1>
            </div>
          </Container>
        </Section>
        <Section className="BLOCK__small">
          <Container>
            {isLoading && (
              <div className="THEME__generic-spinner-wrapper">
                <Spinner />
              </div>
            )}
            {data && table.data && (
              <div className="THEME__mw-800 mx-auto">
                <SimpleTable options={table.options} columns={table.columns} data={table.data} />
              </div>
            )}
          </Container>
        </Section>
      </Dashboard>
    </ProtectedRoute>
  );
};

export default BasecampProjectsIndex;
