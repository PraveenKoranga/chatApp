import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ChatProvider from "./Context/ChatProvider";
import Chatpage from "./Pages/Chatpage";
import Homepage from "./Pages/Homepage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ChatProvider>
          <Routes>
            <Route path="/" element={<Homepage />} exact />
            <Route path="/chats" element={<Chatpage />} exact />
          </Routes>
        </ChatProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
