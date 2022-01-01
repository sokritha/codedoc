import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    if (state.cells) {
      const { data, order } = state.cells;
      const orderedCells = order.map((id) => data[id]);

      const showFunc = `
            import _React from 'react';
            import _ReactDOM from 'react-dom';
    
            var show = (value) => {
              const root = document.querySelector('#root');
              if (typeof value === 'object'){
                if (value.$$typeof && value.props){
                  _ReactDOM.render(value, root);
                }else {
                  root.innerHTML = JSON.stringify(value);
                }         
              }else {
                root.innerHTML = value;
              }
            }
          `;
      const showFuncNoOp = "var show = () => {}";
      const listCode = [];
      for (let c of orderedCells) {
        if (c.type === "code") {
          if (c.id === cellId) {
            listCode.push(showFunc);
          } else {
            listCode.push(showFuncNoOp);
          }
          listCode.push(c.content);
        }
        if (c.id === cellId) {
          break;
        }
      }
      return listCode;
    }
  })?.join("\n");
};
