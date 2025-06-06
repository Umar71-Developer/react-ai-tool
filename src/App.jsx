import { useEffect, useRef, useState } from "react";
import "./App.css";
import { URL } from "./constants";
import Answer from "./components/Answers";
import RecentSearch from "./components/RecentSearch";
import QuestionAnswer from "./components/QuestionAnswer";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history"))
  );
  const [selectedHistory, setSelectedHistory] = useState("")
  const [loader , setLoader] = useState(false)
  const scrollToAns = useRef()


  async function askQuestion() {
    if (!question && !selectedHistory) {
      return false;
    }
    if (question) {
      if (localStorage.getItem("history")) {
        let history = JSON.parse(localStorage.getItem("history"));
        history = [question, ...history];
        localStorage.setItem("history", JSON.stringify(history));
        setRecentHistory(history);
      } else {
        localStorage.setItem("history", JSON.stringify([question]));
        setRecentHistory([question]);
      }
    }

      const payloadData = question ? question : selectedHistory;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: payloadData,
          },
        ],
      },
    ],
  };

    setLoader(true)
    // console.log(recentHistory)
    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    response = await response.json();
    //  console.log(response)
    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString.map((item) => item.trim());
    //  console.log(dataString)
    setResult([
      ...result,
      { type: "q", text: question ? question : selectedHistory },
      { type: "a", text: dataString },
    ]);
    setQuestion("");

   setTimeout(() => {
     scrollToAns.current.scrollTop=scrollToAns.current.scrollHeight
   }, 500);
   setLoader(false)
  }
  // console.log(result)
  const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  };

  const isEnter = (event) => {
    console.log(event.key);
    if (event.key == "Enter") {
      askQuestion();
    }
  };

  useEffect(() => {
    console.log(selectedHistory);
    askQuestion()
  }, [selectedHistory]);

/* Dark mode features start */
const [darkMode , setDarkMode] = useState('dark')
useEffect(()=>{
console.log(darkMode)
if(darkMode == 'dark'){
document.documentElement.classList.add('dark')
}else{
document.documentElement.classList.remove('dark')
}
},[darkMode])
/* Dark mode features end */
  return (
    <div className={darkMode == 'dark' ? 'dark' : 'light'}>
    <div className="grid grid-cols-5 h-screen text-center">
      <select onChange={(event)=> setDarkMode(event.target.value)} className="fixed dark:text-white dark:bg-zinc-800 text-zinc-800 bottom-0 p-5">
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
      <RecentSearch clearHistory={clearHistory} recentHistory={recentHistory} setSelectedHistory={setSelectedHistory} />
      <div className="col-span-4 p-10">
        
        <div ref={scrollToAns} className="container overflow-auto h-160">
          <h1 className="text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-700">Helo user, Ask me Anything</h1>
          {loader ? <div role="status">
    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>: null}
          
          <div  className="text-white   p-4">
            <ul>
              {result.map((item, index) => (
                <QuestionAnswer item={item} index={index} key={index} />
              ))}
            </ul>
            {/* <ul>

        
        {result ? result.map((item , index) => (<li className='text-left p-1' key={index+Math.random()}><Answer ans={item} index={index} totalResult = {result.length} /></li>)):null}
        
        </ul> */}
          </div>
        </div>
        <div className="dark:bg-zinc-800 bg-red-100  w-1/3 m-auto border border-zinc-600 rounded-4xl flex dark:text-white text-zinc-800 pr-5 ">
          <input
            className=" w-full h-15 p-3 outline-none"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={isEnter}
            type="text"
            placeholder="Ask me Anything"
          />
          <button className="cursor-pointer" onClick={askQuestion}>
            Ask
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
