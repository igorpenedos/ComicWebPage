import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const query = window.location.search;
  const params = new URLSearchParams(query);
  let number = 1;

  if (params.has('n')){
    number = params.get('n');
  }else{
    number = 1;
  }
  
  return (
    <>
      <nav>
       <p id="navTitle">Comic Viewer</p>
       <p id="navName">By: Igor Goncalves Penedos</p>
      </nav>
      <div id="body">
        <Comic number={number}/>
      </div>
    </>
  );
}

const Comic = (props) => { 
  const [Num, setNum] = useState(props.number);
  const [Data, setData] = useState('');
  var newurl;

  useEffect(() =>{
    document.getElementById('number').value = '';
    const getData = async () => {setData(await axios.get('http://localhost:4000/getData', {params:{Num}}))};
    getData();
  }, [Num]);

  const setNewURL = (num) => {
    newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?n=' + num;
    window.history.pushState({path:newurl},'',newurl);
  }

  const previous = (e) => {
    e.preventDefault();
    if ((Num - 1) < 1){
      setNewURL(2475);
      setNum(2475);
    }else{
      setNewURL(parseInt(Num) - 1);
      setNum(parseInt(Num) - 1);
    }
  };

  const next = (e) => {
    e.preventDefault();
    if ((Num + 1) > 2475){
      setNewURL(1);
      setNum(1);
    }else{
      setNewURL(parseInt(Num) + 1);
      setNum(parseInt(Num) + 1);
    }
  }; 

  const search = (e) => {
    e.preventDefault();
    console.log(Data.data)
    const newNum = parseInt(document.getElementById('number').value);
    if (Number.isInteger(newNum) && 0 < newNum && newNum < 2476){
      setNewURL(newNum);
      setNum(newNum);
    }else{
      document.getElementById('number').value = '';
      document.getElementById('number').placeholder = Num;
      alert(newNum + ' is not a NUMBER between 1 and 2475');
    }
  }

  const randomNum = (e) => {
    e.preventDefault();
    const newNum = Math.floor(Math.random() * 2476);
    setNewURL(newNum);
    setNum(newNum);
  }

  return <>
    <input type="text" placeholder={Num} id="number"/>
    <input type="button" value="Search" onClick={search} id="search"/>
    <input type="button" value="Random" onClick={randomNum} id="random"/>
    {Data.data ? <Info data={Data.data}/>:null}
    <div id="comic">
      <span id="previous" onClick={previous}></span>
      <img src={Data.data ? Data.data.img : '' } alt="Comic" id="comicImg"/>
      <span id="next" onClick={next}></span>
    </div>
    <Transcript transcript={Data.data ? Data.data.transcript : null} alt={Data.data ? Data.data.alt : null}/>
  </>
}

const Info = (props) => {
  const data = props.data;
  let date = new Date(2020, data.month - 1, 21);
  let month = date.toLocaleString('en-us', { month: 'long' });

  return <>
    {data 
    ?<><div id="title"># {data.num}: {data.title || data.safe_title}</div><div id="date">Created: {month} {data.day}, {data.year}</div></>
    :null}
  </>
}

const Transcript = (props) => {
  const data = props;
  const alt = props.alt;
  const [isOpen ,setIsOpen] = useState(false);
  let transcript;
  data.transcript ? transcript = data.transcript.split('\n') : transcript = '';
  const changeOpen = () => {
    setIsOpen(!isOpen)
  }

  return<>
    <input className="transcript btnTranscript" type="button" value="Transcript" onClick={changeOpen}/>
    {isOpen && transcript
    ? transcript.map(temp =>{
      return <p className="transcript">{temp}</p>
    })
    : null}
    {isOpen && alt && ! Boolean(transcript) ? <p className="transcript">{alt}</p> : null}
  </>
}

export default App;
