import './App.css';
import IconGithub from './Icon/IconGitHub.png'
import IconLinkedin from './Icon/IconLinkedIn.png'
import IconBatman from './Icon/IconBatman.png'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

function App1() {
  const [investmentData, setInvestmentData] = useState('');
  const [showChart, setShowChart] = useState(false);

  const handleInvestmentsClick = () => {
    fetch('http://127.0.0.1:5000/return_investment_pie')
      .then((response) => response.json())
      .then((data) => {
        const decodedDataTickers = JSON.parse(JSON.parse(atob(data.tickerList)));
        const decodedTotRtn = JSON.parse(JSON.parse(atob(data.totalRtn)));
        const decodedtotalRtnPercentage = JSON.parse(JSON.parse(atob(data.totalRtnPercentage)));
        const investmentDataExtracted = {'tickerList':{'ticker': [],'trueInitValue': [],'totRtn': [],'trueCurrValue': [],'perPie': [],'perTotRtn': [],'colour':[]},'totalRtn':decodedTotRtn,'totalRtnPercentage':decodedtotalRtnPercentage}
        for (let i = 0; i < Object.keys(decodedDataTickers.ticker).length; i++) {
          investmentDataExtracted.tickerList.ticker.push(decodedDataTickers.ticker[i])
          investmentDataExtracted.tickerList.trueInitValue.push(decodedDataTickers.trueInitValue[i])
          investmentDataExtracted.tickerList.totRtn.push(decodedDataTickers.totRtn[i])
          investmentDataExtracted.tickerList.trueCurrValue.push(decodedDataTickers.trueCurrValue[i])
          investmentDataExtracted.tickerList.perPie.push(decodedDataTickers.perPie[i])
          investmentDataExtracted.tickerList.perTotRtn.push(decodedDataTickers.perTotRtn[i])
          const red = Math.random()*255
          const green = Math.random()*255
          const blue = Math.random()*255
          investmentDataExtracted.tickerList.colour.push(`rgb(${red},${green},${blue})`)
        }
        setShowChart((prev) => !prev)
        setInvestmentData(investmentDataExtracted)
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
              showChart ? 
              (<div className='App-sub-main-body12-pie-chart'>
                <h2>Total Return: £{Number(investmentData.totalRtn).toFixed(2)} (+{Number(investmentData.totalRtnPercentage).toFixed(2)}%)</h2>
                <Pie data = {{
                  labels: investmentData.tickerList.ticker, datasets:[{
                    data:investmentData.tickerList.trueCurrValue,backgroundColor:investmentData.tickerList.colour,borderColor: investmentData.tickerList.colour, borderWidth:0
                    }]
                  }}
                />
              </div>):
              (<img src = {IconBatman} alt = 'WHERE IS SHE!!'style={{ width: '15vw', height: 'auto' }}/>)
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
