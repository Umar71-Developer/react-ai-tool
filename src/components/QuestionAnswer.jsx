import React from 'react'
import Answer from './Answers'
function QuestionAnswer({item , index}) {
  return (
    <>
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
    </>
  )
}

export default QuestionAnswer