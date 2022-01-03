import {
  Cell,
  CellTypes,
  firstIndexCodeCellOrder,
  firstIndexTextCellOrder,
} from "../state";

const defaultMarkdownText: string = `
**JPedia**


----------

This is an interactive coding environment. You can write Javascript, see it executed, and write comprehensive documentation using markdown.

- Click any text cell (including this one) to edit it
- The code in each code editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any follwing cell!
- You can show any React component, string, nymber, or anything else by calling the \`show\` function. This is a function built into this environment. Call show multiple times to show multiple values
- Re-order or delete cells using the buttons on the top right
- Add new cells by hovering on the divider between each cell

All of your changes get saved to the file you opened JPedia with. So if you ran \`npx jpedia serve test.js\`, all of the text and code you write will be saved to the test.js file.
`;

const defaultCode: string = `// Example
import {useState} from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);

    return (<div>
        <h1>Current Count: {count}</h1>
        <hr/>
        <button onClick={()=>{setCount(count + 1)}}>+</button>
        <button onClick={()=>{setCount(count - 1)}}>-</button>
      </div>);
    };

// Display any variable or React Component by calling 'show'
show(<Counter/>);
`;

export const sourceCellEditor = (cell: Cell, type: CellTypes): string => {
  if (cell.content) return cell.content;

  if (type === "code") {
    return firstIndexCodeCellOrder !== cell.id ? "" : defaultCode;
  } else {
    return firstIndexTextCellOrder !== cell.id
      ? "Click to edit!"
      : defaultMarkdownText;
  }
};
