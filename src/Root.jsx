import { BrowserRouter ,Routes,Route} from "react-router-dom";
import AddCampaign from "./components/AddCampaign";
import App from "./App";
// import AddCampaign from "./components/AddCampaign";
// import Sandbox from "./Sandbox/Sandbox";
// import Transition from "./Sandbox/Transition";

export default function Root() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/add" element={<AddCampaign/>} />
                <Route path="/add" element={<AddCampaign/>} />
                {/* <Route path="/sandbox" element={<Sandbox/>} /> */}
                {/* <Route path="/trs" element={<Transition/>} /> */}
            </Routes>
        </BrowserRouter>
    )
}