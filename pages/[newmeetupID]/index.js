import { MongoClient } from "mongodb";
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
  const client = await MongoClient.connect(
    "mongodb+srv://aripovjr:rNbrwR0l8PpGAqly@cluster0.mugkpxq.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  return {
    fallback: true,
    paths: meetups.map((meetup) => ({
      params: { meetupID: meetup._id.toString() },
    })),
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
