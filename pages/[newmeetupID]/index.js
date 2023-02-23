import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails() {
  return (
    <MeetupDetail
      image="https://upload.wikimedia.org/wikipedia/commons/d/d6/London-Eye-2009.JPG"
      title="A frist meetup"
      address="Some random address in Uzbekistan"
      description="Here should have been some description about first meetup"
    />
  );
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          newmeetupID: "m1",
        },
      },
      {
        params: {
          newmeetupID: "m2",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const newmeetupID = context.params.newmeetupID;

  console.log(newmeetupID);

  return {
    props: {
      meetupData: {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/d/d6/London-Eye-2009.JPG",
        id: newmeetupID,
        title: "A frist meetup",
        address: "Some random address in Uzbekistan",
        description:
          "Here should have been some description about first meetup",
      },
    },
  };
}

export default MeetupDetails;
