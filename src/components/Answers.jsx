import React , {useState , useEffect} from 'react'
import { checkHeading, removeAsterisks } from '../helper.js'



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

  return (
    <>
    {
    index == 0 && totalResult > 1 ? <span className='pt-2 text-xl block dark:text-white text-zinc-800'>{answer}</span>:
    heading?<span className='pt-2 text-lg block dark:text-white text-zinc-800'>{answer}</span> : <span className={type == 'q' ? 'pl-1' : 'pl-6'}>{answer}</span>}
    </>
  )
}

export default Answer