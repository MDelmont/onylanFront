

import '../styles/testPage.scss'
import NavBar from '../components/navBar/navBar';
import Timer from '../components/timer/timer';



const TestPage = () => {
 
  return (
    <div className="test-Page">
      <Timer numberDays={99} numberHours={24} numberMinutes={59} numberSecondes={59} />
    </div>
  );
};

export default TestPage;
