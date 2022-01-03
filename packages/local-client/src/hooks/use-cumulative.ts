import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    if (state.cells) {
      const { data, order } = state.cells;
      const orderedCells = order.map((id) => data[id]);

      const showFunc = `
            // By default, EsBuild will assume when we use jsx, we will use React.createElement
            // So, by this setting we can change React into _React

            import _React from 'react';
            import _ReactDOM from 'react-dom';
    
            var show = (value) => {
              const root = document.querySelector('#root');
              // console.log(value);
              
              if (typeof value === 'object'){
                if (value.$$typeof && value.props){
                  _ReactDOM.render(value, root);
                }
                // log the object into the preview
                else {
                  root.innerHTML = "<pre style='font-size:14px;'>" + JSON.stringify(value, undefined, 2) + "</pre>";
                }         
              }
              // the possible value could be: string, number, array, ...
              else {
                root.innerHTML = value;
              }
            }
          `;
      const showFuncNoOp = "var show = () => {}";
      const listCode = [];
      for (let c of orderedCells) {
        // Add Code Cell to the list
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
