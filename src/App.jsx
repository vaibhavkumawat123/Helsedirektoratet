import Navbar from "./components/Navbar";
import TableExperience from "./components/TableExperience";

export default function App() {
  return (
    <div className="w-full min-h-screen">

      {/* NAVBAR */}

      <Navbar />

      {/* 3D SCROLL SECTION */}

      <TableExperience />

    </div>
  );
}