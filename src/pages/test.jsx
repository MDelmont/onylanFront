

import '../styles/testPage.scss'
import NavBar from '../components/navBar/navBar';
import Timer from '../components/timer/timer';
import BtnSecondary from '../components/basic/btnSecondary/btnSecondary';
import InputLabel from '../components/formulaire/inputLabel/inputLabel';



const TestPage = () => {
 
  return (
    <div className="test-Page">
      <InputLabel input={<button>test</button>} title={'test'} />
      <InputLabel input={<button>test</button>} title={'test'} />
      <InputLabel input={<button>test</button>} title={'test'} />
      <InputLabel input={<button>test</button>} title={'test'} />
      <InputLabel input={<button>test</button>} title={'test'} />
    </div>
  );
};

export default TestPage;
