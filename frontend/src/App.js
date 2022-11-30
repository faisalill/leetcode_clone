import { useState } from 'react';
import './App.css';
import CodeMirror from '@uiw/react-codemirror';
import axios from 'axios'
import {python} from '@codemirror/lang-python'
import { okaidia } from '@uiw/codemirror-theme-okaidia';
function App() {
  const [Code, setCode] = useState(``)
  const [testCaseResults, setTestCaseResults] = useState([]);
  const testCases = {
    one: [1, 2, 3],
    two: [2, 2, 4],
    three: [2, -2, 0],
  };
  let boilerPlate = `import sys;  
${Code}
if __name__ == "__main__":
  a = int(sys.argv[1])
  b = int(sys.argv[2])
  result = int(sys.argv[3])
  print(add(a, b) == result)`

  const check = (value) =>{
      setCode(value)
      
  }

  const submitHandler = () =>{
    axios.post("http://localhost:4000/python", {boilerPlate, testCases})
    .then(({ data }) => {
      setTestCaseResults(data.testCaseResults);
    })
    .catch((err) => console.log(err));
    // console.log(typeof Code)
    // console.log(Code)
    // console.log(typeof boilerPlate)
    // console.log(Code)

    
    
  }
  return (
    <div>
       <div >Create a function named add to add a and b.</div>
      <CodeMirror
      height='400px'
      value={Code}
      width= '500px'
      theme={okaidia}
      extensions={[python()]}
      onChange={check}
      className='inline-block'
    />
    <div className='  bg-okaida inline-block  h-[400px] w-[500px] top-12 left-2 relative text-white p-4' >
      <h1 className='  '>Output</h1>
       <p className=' top-1 relative left-3 bg-oakida-bg p-1  '>
       {testCaseResults.map((res, i) => {
              return (
                <div key={i}>
                  <div>{res === 'True' ? `Test Case ${i+1}: 🚀  passed` : `Test Case ${i+1}: ❌ failed`}</div>
                </div>
              );
            })}
        </p>
    </div>
    <div><button onClick={submitHandler} className=' bg-zinc-800 text-white left-6 relative rounded-lg p-2 top-2'>Run Code</button></div>
    </div>
  );
}

export default App;
