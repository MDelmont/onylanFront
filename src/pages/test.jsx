

import '../styles/testPage.scss'
import NavBar from '../components/navBar/navBar';
import Timer from '../components/timer/timer';
import BtnSecondary from '../components/basic/btnSecondary/btnSecondary';
import InputLabel from '../components/formulaire/inputLabel/inputLabel';
import InputPrimary from '../components/basic/inputPrimary/inputPrimary';



const TestPage = () => {
 
  return (
    <div className="test-Page">
      <InputLabel input={<BtnSecondary  title={'test'} />} title={'test'} />
      <InputLabel input={<InputPrimary />} title={'test'} />
      <InputLabel input={<BtnSecondary  title={'test'} />} title={'test'} />
      <InputLabel input={<BtnSecondary  title={'test'} />} title={'test'} />
      <InputLabel input={<BtnSecondary  title={'test'} />} title={'test'} />
    </div>
  );
};

export default TestPage;
