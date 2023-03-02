import React, { useState, useEffect } from "react";
import Dashboard from "@/components/wrappers/Dashboard";
import Spinner from "@/components/core/Spinner";
import Skeleton from "react-loading-skeleton";
import Section from "@/components/wrappers/Section";
import Container from "@/components/wrappers/Container";
import {
  usePeopleFromProjectGET,
  useSingleProjectFromBasecampGET,
  fetchFromAxios,
  useFindOrganizationByBasecampIdGET,
} from "@/lib/Fetcher";
import { useAppContext } from "@/context/AppWrapper";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import SimpleTable from "@/components/core/SimpleTable";
import Button from "@/components/core/Button";
import ProtectedRoute from "@/lib/ProtectedRoute";

const BasecampProjectsSingle = () => {
  const router = useRouter();
  const { user } = useAppContext();
  const { query } = router;
  const { id: projectId } = query;

  const [projectDetails, setProjectDetails] = useState(null);

  const { data, isLoading, isError } = usePeopleFromProjectGET(projectId, user?.token);
  const {
    data: organizationData,
    isLoading: organizationIsLoading,
    isError: organizationIsError,
  } = useFindOrganizationByBasecampIdGET(projectDetails?.id, user?.token);
  const {
    data: projectData,
    isLoading: projectIsLoading,
    isError: projectIsError,
  } = useSingleProjectFromBasecampGET(projectId, user?.token);
  const [table, setTable] = useState({
    options: {
      enableButtonColumn: false,
      buttonColumnWidth: 0,
    },
    columns: [
      {
        key: "name",
        label: "Name",
        width: 3,
      },
      {
        key: "userId",
        label: "ID",
        width: 3,
      },
      {
        key: "email",
        label: "Email",
        width: 3,
      },
      {
        key: "syncStatus",
        label: "Sync Status",
        width: 3,
      },
    ],
    data: null,
  });
  const [syncStatusCounter, setSyncStatusCounter] = useState(0);
  const [organizationIsSynced, setOrganizationIsSynced] = useState(false);

  const fetchUsersStatusSync = () => {
    if (table.data && table.data.length > 0 && user) {
      const tableCopy = { ...table };
      const tableDataCopy = [...tableCopy.data];
      tableDataCopy.forEach((elem, index) => {
        const fetchUserByEmail = async () => {
          const response = await fetchFromAxios(
            `${process.env.NEXT_PUBLIC_API_URL}/users?filters[$and][0][email][$eq]=${elem.email}`,
            user?.token
          );
          if (response.data.length > 0) {
            tableDataCopy[index].syncStatus = <span className="THEME__text-success">Synced</span>;
          } else {
            tableDataCopy[index].syncStatus = (
              <span className="THEME__text-danger">Not Synced</span>
            );
          }
          setTable((prevState) => ({ ...prevState, data: tableDataCopy }));
        };
        fetchUserByEmail();
      });
    }
  };

  const syncOrganization = () => {
    if (organizationIsSynced) {
      const organizationPayload = {
        title: "",
      };
      const postPayload = async () => {
        await axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/organizations`, payload)
          .then(sleeper(500))
          .then((res) => {
            console.log(res);
            setSuccessMessage(`We emailed you a login link. Please login using that link.`);
            setLoginUser((prevState) => ({ ...prevState, isLoading: false }));
            reset();
          })
          .catch((err) => {
            console.log(err);
            if (err.response) {
              setErrorMessage(`Oops. Something went wrong.`);
              setLoginUser((prevState) => ({ ...prevState, isLoading: false }));
            }
          });
      };
      postPayload();
    }
  };

  useEffect(() => {
    if (data) {
      const clients = data.data.filter((elem) => elem.client === true);
      const tableData = clients.map((elem) => {
        return {
          name: elem.name,
          userId: elem.id,
          email: elem.email_address,
          syncStatus: (
            <>
              <div className="text-center">
                <Spinner table />
              </div>
            </>
          ),
        };
      });
      setTable({
        ...table,
        data: tableData,
      });
      setSyncStatusCounter(syncStatusCounter + 1);
    }
  }, [data]);

  useEffect(() => {
    fetchUsersStatusSync();
  }, [syncStatusCounter]);

  useEffect(() => {
    if (projectData) {
      setProjectDetails(projectData.data);
      console.log(projectDetails);
    }
  }, [projectData]);

  useEffect(() => {
    if (organizationData) {
      if (organizationData?.data?.length > 0) {
        setOrganizationIsSynced(true);
      } else {
        setOrganizationIsSynced(false);
      }
    }
  }, [organizationData]);

  return (
    <ProtectedRoute>
      <NextSeo
        title={`${
          projectDetails ? projectDetails?.name : `Basecamp Project`
        } | Basecamp Project | Clients OneIMS`}
      />
      <Dashboard>
        <Section className="THEME__bg-app-light BLOCK__small THEME__border-bottom">
          <Container>
            <div className="text-center">
              {projectData ? (
                <>
                  <h1 className="h3 mb-0">{projectDetails?.name}</h1>
                </>
              ) : (
                <div className="THEME__mw-400 mx-auto">
                  <Skeleton borderRadius={100} height={34} />
                </div>
              )}
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
              <div className="THEME__mw-1000 mx-auto">
                <Button
                  destination="/internal/basecamp/projects"
                  variant="ghost-bw"
                  className="THEME__font-size-0n8 py-1"
                >
                  Back
                </Button>
                {organizationData ? (
                  <div className="text-end THEME__font-size-0n8">
                    <p className="mb-3">
                      Organization Sync Status:{" "}
                      {organizationIsSynced ? (
                        <span className="THEME__text-success">Synced</span>
                      ) : (
                        <span className="THEME__text-danger">Not Synced</span>
                      )}
                    </p>
                  </div>
                ) : (
                  <div style={{ maxWidth: "200px" }} className="mx-auto me-0 mb-2">
                    <Skeleton borderRadius={100} height={15} />
                  </div>
                )}
                <div>
                  <SimpleTable options={table.options} columns={table.columns} data={table.data} />
                </div>
                {table.data.length > 0 && (
                  <div className="mt-4 pt-3 text-center">
                    <Button
                      variant="ghost-bw"
                      className="THEME__font-size-0n8 py-2"
                      onClick={() => {
                        console.log("ok");
                      }}
                    >
                      Sync Organization
                    </Button>
                    <p className="mb-0 THEME__font-size-0n9 mt-3">
                      Users already synced will not be added again.
                    </p>
                  </div>
                )}
              </div>
            )}
          </Container>
        </Section>
      </Dashboard>
    </ProtectedRoute>
  );
};

export default BasecampProjectsSingle;
