import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "state/store";
import { Navbar } from "components/commons";
import { CodeDocPage } from "pages";
import "./style.css";
import { callbackify } from "util";

const App = () => {
  return (
    <Provider store={store}>
      <div className="home-container">
        <Navbar />

        <CodeDocPage />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
