import React from "react";
import Dashboard from "@/components/wrappers/Dashboard";
import Spinner from "@/components/core/Spinner";
import Skeleton from "react-loading-skeleton";
import Section from "@/components/wrappers/Section";
import Container from "@/components/wrappers/Container";
import { useUserDataById } from "@/lib/Fetcher";
import { timeSince } from "@/lib/Helpers";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

const UserProgress = () => {
  const router = useRouter();
  const { query } = router;
  const { id } = query;
  let firstName, lastName, email, company, progress;
  const { data, isLoading, isError } = useUserDataById(id);
  if (data) {
    firstName = data.firstName;
    lastName = data.lastName;
    email = data.email;
    company = data.company;
    progress = data.progress;
    console.log(new Date(data.updatedAt));
    console.log(timeSince(new Date(data.updatedAt)));
  }

  return (
    <>
      <NextSeo title={`${data ? `User Data | ${email}` : `User Data`} | Clients OneIMS`} />
      <Dashboard>
        <Section className="THEME__bg-app-light BLOCK__small THEME__border-bottom">
          <Container>
            <div className="text-center">
              {isLoading && (
                <div className="mx-auto" style={{ maxWidth: "250px" }}>
                  <Skeleton borderRadius height={34} />
                </div>
              )}
              {email && <h1 className="h3 mb-0">{email}</h1>}
            </div>
          </Container>
        </Section>
        <Section>
          <Container>
            {isLoading && (
              <div className="THEME__generic-spinner-wrapper">
                <Spinner />
              </div>
            )}
            {data && (
              <div className="MODULE__table-wrapper THEME__mw-800 mx-auto">
                <div className="mb-3">
                  <h2 className="h6">User Details</h2>
                  <span>Last updated {timeSince(new Date(data.updatedAt))}</span>
                </div>
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>First Name</td>
                      <td>{firstName}</td>
                    </tr>
                    <tr>
                      <td>Last Name</td>
                      <td>{lastName}</td>
                    </tr>
                    <tr>
                      <td>Email Address</td>
                      <td>{email}</td>
                    </tr>
                    <tr>
                      <td>Company</td>
                      <td>{company}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {progress && progress.length > 0 && (
              <div className="MODULE__table-wrapper THEME__mw-800 mx-auto">
                {progress.map((elem, index) => {
                  const { parentTrackTitle, segments } = elem;
                  return (
                    <div className="mt-5" key={index}>
                      <h2 className="h6 mb-3">{parentTrackTitle}</h2>
                      <table className="table table-bordered">
                        {segments.map((elem2, index2) => {
                          const { formFields } = elem2;
                          return (
                            <React.Fragment key={index2}>
                              <thead className="THEME__bg-app-dark THEME__text-inverted w-100 THEME__f-600">
                                <tr className="py-5">
                                  <td colSpan="2" className="text-white w-100">
                                    {elem2.title}
                                  </td>
                                </tr>
                              </thead>
                              {formFields && (
                                <>
                                  <tbody>
                                    {Object.keys(formFields).map((elem3, index3) => {
                                      return (
                                        <tr key={index3}>
                                          <td>{elem3}</td>
                                          <td>{formFields[elem3] ? formFields[elem3] : "N/A"}</td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </table>
                    </div>
                  );
                })}
              </div>
            )}
          </Container>
        </Section>
      </Dashboard>
    </>
  );
};

export default UserProgress;
