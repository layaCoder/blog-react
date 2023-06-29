import React from "react";
import { useState, useTransition } from "react";

const Index = () => {

    const [num, setNum] = useState(0);
    const [length, setLength] = useState(0);
    const [isPending, startTransition] = useTransition();
    const handleInputChange = ({ target: { value } }) => {
        const foramtVal = parseInt(value) || 0;
        setNum(foramtVal);//紧急更新
        startTransition(() => setLength(foramtVal));//低优先级更新
    };
    return (
        <div>
            <input onChange={handleInputChange} value={num}></input>
            <ul>
                {isPending
                    ? "pending..."
                    : Array(length)
                        .fill(0)
                        .map((_, i) => <li key={i}>{length - i}</li>)}
            </ul>
        </div>
    );

}

export default Index