import './App.css';
import IconGithub from './Icon/IconGitHub.png'
import IconLinkedin from './Icon/IconLinkedIn.png'
import IconBatman from './Icon/IconBatman.png'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useState } from 'react';

function App1() {
  const [showChart, setShowChart] = useState(false);
  const [chartImage, setChartImage] = useState('');

  const handleInvestmentsClick = () => {
    fetch('http://127.0.0.1:5000/return_investment_pie')
      .then((response) => response.json())
      .then((data) => {
        setChartImage(data.chart);
        setShowChart(true);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className='Name'>
        <p>
          Brevin Abraham
        </p>
        </div>
        <div className='Contacts'>
        <p style = {{textAlign: "right"}}>
          Contacts
        </p>
        </div>
      </header>
      <body>
        <div className='App-main-body1'>
          <div className='App-sub-main-body11'>
            <strong>
              Masters of Mathematics <br/> 
              Analyst <br/> 
              <Link className='link' onClick={handleInvestmentsClick}>Investments</Link><br/>
              Aspiring Software Engineer<br/>
            </strong>
          </div>
          <div className='App-sub-main-body12'>
            {
              showChart ? (<img src={`data:image/png;base64,${chartImage}`} alt='Pie Chart' style={{ width: '30vw', height: 'auto' }}/>):(<img src = {IconBatman} alt = 'WHERE IS SHE!!'style={{ width: '15vw', height: 'auto' }}/>)
            }
          </div>
        </div>
        <footer className='App-footer'>
          <p>
            <a href='https://github.com/brevinabraham'>
              <img src={IconGithub} alt = 'My GitHub' style={{ width: '50px', height: '50px' }}/>
            </a> 
            &emsp; &emsp; &emsp;
            <a href='https://www.linkedin.com/in/brevin-a-222781161/'>
              <img src={IconLinkedin} alt = 'My Linkedin' style={{ width: '50px', height: '50px' }}/>
            </a> 
            </p>
        </footer>
      </body>
    </div>
  );
}

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element= {[<App1/>]}/>
        </Routes>
      </Router>
    </div>
  );
}
  


export default App;
