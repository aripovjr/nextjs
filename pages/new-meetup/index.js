import NewMeetupForms from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const addMeetupHandler = (enteredMeetupData) => {
    console.log(enteredMeetupData);
  };
  return <NewMeetupForms onAddMeetup={addMeetupHandler} />;
}

export default NewMeetupPage;
