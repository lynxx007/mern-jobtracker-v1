import { Dashboard } from "./routes/Dashboard/Dashboard";
import { Landing } from "./routes/Landing/Landing";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register } from "./routes/Register/Register";
import { Error } from "./routes/Error/Error";
import { Stats } from "./routes/Stats/Stats";
import { Profile } from "./routes/Profile/Profile";
import { AddJob } from "./routes/AddJob/AddJob";
import { AllJob } from "./routes/AllJobs/AllJob";
import { ProtectedRoute } from "./utils/Protected-Route/protected-route-component";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          <Route index element={<Stats />}></Route>
          <Route path="all-jobs" element={<AllJob />}></Route>
          <Route path="add-job" element={<AddJob />}></Route>
          <Route path="profile" element={<Profile />}></Route>
        </Route>
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
