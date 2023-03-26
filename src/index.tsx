import * as esbuild from 'esbuild-wasm';

import { useEffect, useState , useRef } from 'react';
import {createRoot} from 'react-dom/client';

const el = document.getElementById('root');

const root = createRoot(el!);

const App = ()  =>{
    const [input , setInput] = useState('');
    const [code , setCode] =  useState('');
    const ref = useRef<any>();

    const startService = async () =>{

      ref.current =  await esbuild.startService({
            worker:true, 
            wasmURL:"/esbuild.wasm"
        });
        

    };

    const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
        setInput(e.target.value);
    }
    const onClick  =  async  () =>{

        if(!ref.current){
                return ;
        }


        const result = await ref.current.transform(input , {
            loader:'jsx',
            target: 'es2015'
        })

        
        setCode(result.code);


    } 

    useEffect(()=>{

        startService();

    } , []);

    return <div>
        <textarea onChange={onChange} value={input}/>
        <div>
            <button onClick={onClick}>Submit</button>
        </div>
        <pre>{code}</pre>
    </div>
}

root.render(<App />);



