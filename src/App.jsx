import { useState } from "react";
import "./App.css";
import { URL } from "./constants";
import Answer from "./components/Answers";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem('history')));

  const payload = {
    contents: [
      {
        parts: [
          {
            text: question,
          },
        ],
      },
    ],
  };
  async function askQuestion() {
    if (localStorage.getItem('history')) {
      let history = JSON.parse(localStorage.getItem('history'))
      history = [question, ...history]
      localStorage.setItem('history', JSON.stringify(history));
      setRecentHistory(history)
    } else {
      localStorage.setItem('history', JSON.stringify([question]));
      setRecentHistory([question])
    }

    console.log(recentHistory)
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
      { type: "q", text: question },
      { type: "a", text: dataString },
    ]);
  }
  // console.log(result)
const clearHistory = () => {
  localStorage.clear();
  setRecentHistory([])
}

  return (
    <div className="grid grid-cols-5 h-screen text-center">
      <div className="col-span-1 bg-zinc-700">
        <h1 className="text-lg text-white pt-3 flex justify-center items-center"> <span>Recent History</span>

          <button onClick={clearHistory} className="cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#1f1f1f"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg></button>
        </h1>
        
        <ul className="text-left overflow-auto">
        {recentHistory && recentHistory.map((item , index) => 
        <li className="p-0.5 pl-5 cursor-pointer text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 truncate" key={index+Math.random()}>{item}</li>
        )}
        </ul>
      </div>
      <div className="col-span-4 ">
        <div className="container h-160 ">
          <div className="text-white h-[100%] overflow-auto p-4">
            <ul>
              {result.map((item, index) => (
                <div
                  key={index + Math.random()}
                  className={item.type == "q" ? "flex justify-end" : ""}
                >
                  {item.type == "q" ? (
                    <li
                      className="text-right p-2 border-5 bg-zinc-700 border-zinc-700 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl w-fit "
                      key={index + Math.random()}
                    >
                      <Answer
                        ans={item.text}
                        index={index}
                        type={item.type}
                        totalResult={1}
                      />
                    </li>
                  ) : (
                    item.text.map((ansitem, ansIndex) => (
                      <li className="text-left p-2" key={index + Math.random()}>
                        <Answer
                          ans={ansitem}
                          index={ansIndex}
                          type={item.type}
                          totalResult={item.length}
                        />
                      </li>
                    ))
                  )}
                </div>
              ))}
            </ul>
            {/* <ul>

        
        {result ? result.map((item , index) => (<li className='text-left p-1' key={index+Math.random()}><Answer ans={item} index={index} totalResult = {result.length} /></li>)):null}
        
        </ul> */}
          </div>
        </div>
        <div className="bg-zinc-800 w-1/3 m-auto border border-zinc-600 rounded-4xl flex text-white pr-5 ">
          <input
            className=" w-full h-15 p-3 outline-none"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            type="text"
            placeholder="Ask me Anything"
          />
          <button className="cursor-pointer" onClick={askQuestion}>
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
