import React , {useState , useEffect} from 'react'
import { checkHeading, removeAsterisks } from '../helper.js'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import ReactMarkdown from 'react-markdown'



function Answer({ ans , index , totalResult , type}) {

  const [heading , setHeading] = useState(false)
  const [answer , setAnswer] = useState(ans)



  useEffect(() => {
    if(checkHeading(ans)){
      setHeading(true);
      setAnswer(removeAsterisks(ans))
    }

  }, [])

// console.log(answer)
// console.log(heading)

const render = {
  code({node, inline, className, children, ...props}){
    const match= /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter 
      {...props}
      children={String(children).replace(/\n$/,'')}
      language={match[1]}
      style={dark}
      PreTag='div'
      />
    ):(
      <code {...props} className={className}>
        {children}
      </code>
    )
  }
}

  return (
    <>
    {
    index == 0 && totalResult > 1 ? <span className='pt-2 text-xl block dark:text-white text-zinc-800'>{answer}</span>:
    heading?<span className='pt-2 text-lg block dark:text-white text-zinc-800'>{answer}
      </span> : <span className={type == 'q' ? 'pl-1' : 'pl-6'}><ReactMarkdown components={render}>{answer}</ReactMarkdown></span>}
    </>
  )
}

export default Answer