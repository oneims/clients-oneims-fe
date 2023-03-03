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
import axios from "axios";
import { useAppContext } from "@/context/AppWrapper";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import SimpleTable from "@/components/core/SimpleTable";
import Button from "@/components/core/Button";
import ProtectedRoute from "@/lib/ProtectedRoute";
import toast, { Toaster } from "react-hot-toast";

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
  const [organizationInternalId, setOrganizationInternalId] = useState(null);
  const [organizationAndUsersSyncInProgress, setOrganizationAndUsersSyncInProgress] =
    useState(false);

  const [listOfNotSyncedUsers, setListOfNotSyncedUsers] = useState(null);

  const [createOrganization, setCreateOrganization] = useState({
    response: null,
    isLoading: false,
    isError: null,
  });

  const [createUsers, setCreateUsers] = useState({
    response: null,
    isLoading: false,
    isError: null,
  });

  const postHeaders = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  const fetchUsersStatusSync = () => {
    if (table.data && table.data.length > 0 && user) {
      const tableCopy = { ...table };
      const tableDataCopy = [...tableCopy.data];
      tableDataCopy.forEach((elem, index) => {
        const fetchUserByEmail = async () => {
          const response = await fetchFromAxios(
            `${
              process.env.NEXT_PUBLIC_API_URL
            }/users?filters[$and][0][email][$eq]=${elem.email.toLowerCase()}`,
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

  const updateSyncStatusByBasecampId = (status, userId, messageType) => {
    const tableCopy = { ...table };
    const tableDataCopy = [...tableCopy.data];
    const userIndex = tableDataCopy.findIndex((elem) => elem.userId === userId);
    if (status === `loading`) {
      tableDataCopy[userIndex].syncStatus = (
        <div className="loading-before-update">
          <div className="text-center">
            <Spinner table />
          </div>
        </div>
      );
    } else {
      tableDataCopy[userIndex].syncStatus = (
        <span className={`THEME__text-${messageType}`}>{status}</span>
      );
    }
    return tableDataCopy;
  };

  const syncUsers = (internalId) => {
    internalId = organizationInternalId ? organizationInternalId : internalId;
    if (table.data && internalId) {
      let usersSynced = 0;
      let usersErrors = 0;
      setOrganizationAndUsersSyncInProgress(true);
      listOfNotSyncedUsers.forEach((elem) => {
        const { name, userId, email } = elem;
        const updatedLoadingTable = updateSyncStatusByBasecampId(`loading`, userId, `loading`);
        setTable((prevState) => ({ ...prevState, data: updatedLoadingTable }));
        const payload = {
          username: email,
          name: name,
          basecampId: userId.toString(),
          email,
          password: `${userId + userId + 9000}`,
          organization: internalId,
          client: "true",
        };
        const postPayload = async () => {
          await axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`, payload)
            .then((res) => {
              console.log(res);
              usersSynced++;
              const updatedSuccessTable = updateSyncStatusByBasecampId(`Synced`, userId, `success`);
              setTable((prevState) => ({ ...prevState, data: updatedSuccessTable }));
              const updatedListOfNotSyncedUsers = table.data.filter((elem) => {
                return (
                  elem.syncStatus?.props?.children !== `Synced` &&
                  elem.syncStatus?.props?.className !== `loading`
                );
              });
              setListOfNotSyncedUsers(updatedListOfNotSyncedUsers);
              if (updatedListOfNotSyncedUsers.length === 0) {
                setOrganizationAndUsersSyncInProgress(false);
                if (usersErrors === 0) {
                  toast.success(`${usersSynced} user(s) created successfully`);
                }
              }
            })
            .catch((err) => {
              console.log(err);
              usersErrors++;
              if (usersSynced + usersErrors === listOfNotSyncedUsers.length) {
                toast.error(`${usersErrors} user(s) failed. Please try again later`);
                setOrganizationAndUsersSyncInProgress(false);
              }
            });
        };
        postPayload();
      });
    } else {
      setOrganizationAndUsersSyncInProgress(false);
      toast.error(`Something went wrong! Please try later`);
    }
  };

  const syncOrganization = () => {
    if (!organizationIsSynced) {
      if (!projectDetails) return;
      setCreateOrganization((prevState) => ({ ...prevState, isLoading: true }));
      setOrganizationAndUsersSyncInProgress(true);
      const { name, id } = projectDetails;
      const payload = {
        title: name,
        basecampId: id.toString(),
      };
      const postPayload = async () => {
        await axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/organizations`, { data: payload }, postHeaders)
          .then((res) => {
            console.log(res);
            const internalId = res.data.data.id;
            setOrganizationInternalId(internalId);
            toast.success(`Organization ${name} created successfully!`);
            setOrganizationIsSynced(true);
            setCreateOrganization((prevState) => ({ ...prevState, isLoading: false }));
            syncUsers(internalId);
          })
          .catch((err) => {
            console.log(err);
            if (err.response) {
              toast.error("Something went wrong! Please try again later");
              setCreateOrganization((prevState) => ({ ...prevState, isLoading: false }));
              setOrganizationAndUsersSyncInProgress(false);
            }
          });
      };
      postPayload();
    } else {
      syncUsers();
    }
  };

  const syncOrganizationAndUsers = () => {
    syncOrganization();
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
            <div className="loading">
              <div className="text-center">
                <Spinner table />
              </div>
            </div>
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
    }
  }, [projectData]);

  useEffect(() => {
    if (organizationData) {
      if (organizationData?.data?.length > 0) {
        setOrganizationIsSynced(true);
        setOrganizationInternalId(organizationData.data[0]?.id);
      } else {
        setOrganizationIsSynced(false);
        setOrganizationInternalId(null);
      }
    }
  }, [organizationData]);

  useEffect(() => {
    if (table.data) {
      const missingUsers = table.data.filter((elem) => {
        return (
          elem.syncStatus?.props?.children !== `Synced` &&
          elem.syncStatus?.props?.className !== `loading`
        );
      });
      setListOfNotSyncedUsers(missingUsers);
      console.log(missingUsers);
    }
  }, [table]);

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
                {table.data.length > 0 && listOfNotSyncedUsers?.length > 0 && (
                  <div className="mt-4 pt-3 text-center">
                    <Button
                      isLoading={organizationAndUsersSyncInProgress}
                      variant="ghost-bw"
                      className="THEME__font-size-0n8 py-2 mx-auto"
                      onClick={() => {
                        syncOrganizationAndUsers();
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
      <Toaster position="top-center" reverseOrder={false} />
    </ProtectedRoute>
  );
};

export default BasecampProjectsSingle;
