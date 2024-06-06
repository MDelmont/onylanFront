

import GameCard from '../components/gameCard/gameCard';
import '../styles/testPage.scss'





const TestPage = () => {
  



  return (
    <div className="test-Page">
      <GameCard name={"DOFUS TOUCH"} imgSrc={'/dofus.webp'} note={5} actualNote={3} maxNote={5} />
 
    </div>
  );
};

export default TestPage;
