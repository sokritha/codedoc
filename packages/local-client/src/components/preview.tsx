import { useRef, useEffect } from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
  bundlingStatus: string;
}

const html = `
<html>
    <head>
      <style> html{background-color: white;} </style>
    </head>
    <body>
        <div id="root"><div>
    </body>
    <script>
        const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;">' + "<h4>Runtime Error</h4>" + err + '</div>'
            console.error(err);
        }
        window.addEventListener('error', (event)=> {
          event.preventDefault();
          handleError(event.error)
        })
        window.addEventListener('message', (event)=> {
            try {
                eval(event.data);
            } catch (err){
                handleError(err);
            }
        }, false);
    </script>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, bundlingStatus }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      // post message btw windows & iframe
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        srcDoc={html}
        sandbox="allow-scripts"
        ref={iframe}
        title="preview"
      />
      {
        bundlingStatus && <div className="preview-error">{bundlingStatus }</div>
      }
    </div>
  );
};

export default Preview;
