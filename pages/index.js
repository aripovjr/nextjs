import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// for static generation we need a function with the following name and it should be only getStaticProps()
//next js will recongince automatically this name
//and runs the following function before it renders props to the component on the page
//and this function should be only in the "pages" folder
//it can be async function as well and we can fetch data from API or database
//it always returns object, we usually need "props" as we pass it to the component above
//getStaticProps runs during "next build" so it means every time we build it

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://aripovjr:rNbrwR0l8PpGAqly@cluster0.mugkpxq.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    //so in case we want our page be rendered every some parrticular time
    //we need to assign time in seconds to "revalidate" key 10 means 10 seconds
    //if we want ro re-generate our page every hour, we assign 3600
    revalidate: 1,
  };
}

//unlike getStaticProps(), getServerSideProps() runs always on the server after deployment,
//will not run during the build process
//we don't need "revalidate" here as this function pre-generated every incoming request

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: DUMMY_MEETUPS,
//   };
// }

export default HomePage;
