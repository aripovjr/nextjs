import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d6/London-Eye-2009.JPG",
    address: "Some address 5, 12345 Some city",
    description: "This is a second meet up",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d6/London-Eye-2009.JPG",
    address: "Some address 5, 12345 Some city",
    description: "This is a second meet up",
  },
];

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

// for static generation we need a function with the following name and it should be only getStaticProps()
//next js will recongince automatically this name
//and runs the following function before it renders props to the component on the page
//and this function should be only in the "pages" folder
//it can be async function as well and we can fetch data from API or database
//it always returns object, we usually need "props" as we pass it to the component above
//getStaticProps runs during "next build" so it means every time we build it

export async function getStaticProps() {
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    //so in case we want our page be rendered every some parrticular time
    //we need to assign time in seconds to "revalidate" key 10 means 10 seconds
    //if we want ro re-generate our page every hour, we assign 3600
    revalidate: 10,
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
