import Banner from "../Banner/Banner";
import Contact from "../Contact/Contact";
import Feedback from "../Feedback/Feedback";
import Learning from "../Learning/Learning";
import Classes from "../Sponsors/Classes/Classes";
import Sponsors from "../Sponsors/Sponsors";
import Teachers from "../Teachers/Teachers";
import TotalStuUsersEnroll from "../TotalStuUsersEnroll/TotalStuUsersEnroll";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Sponsors></Sponsors>
      <Classes></Classes>
      <Feedback></Feedback>
      <TotalStuUsersEnroll></TotalStuUsersEnroll>
      <Teachers></Teachers>
      <Learning></Learning>
      <Contact></Contact>
    </div>
  );
};

export default Home;
