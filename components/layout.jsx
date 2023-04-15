import Nav from "../components/Nav";
import "react-toastify/dist/ReactToastify.css"

export default function Layout({children}) {
  return (
    <div className="font-poppins text-white min-h-screen">
      <Nav/>
      <div className="mx-6 md:max-w-2xl md:mx-auto">
        <main>{children}</main>
      </div>
    </div>
  );
}