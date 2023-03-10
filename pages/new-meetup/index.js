import NewMeetupForms from "../../components/meetups/NewMeetupForm";
import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    router.replace("/");
  }
  return (
    <Fragment>
      <Head>
        <title>Add new Meetups</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities "
        />
      </Head>
      <NewMeetupForms onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
