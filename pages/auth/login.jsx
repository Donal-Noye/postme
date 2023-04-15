import {FcGoogle} from 'react-icons/fc';
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "../../utils/firebase";
import {useRouter} from "next/router";
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect} from "react";

export default function login() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  // Sign in with Google
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return route.push("/");
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (user) {
      route.push('/');
    } else {
      console.log('login');
    }
  }, [user]);

  return (
    <div className="mt-32">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-medium mb-3">Getting Started</h1>
        <p className="text-sm">Create an account to continue and connect to people</p>
      </div>


      <div className="shadow-xl px-12 py-10 text-gray-700 rounded-lg bg-black flex flex-col items-center">
        <button onClick={GoogleLogin}
                className="bg-dark-gray text-white bg-gray-700 justify-center font-medium rounded-lg flex align-middle py-4 px-8 gap-2 hover:bg-dark-gray/75 transition-colors"
        >
          <FcGoogle className="text-2xl"/>
          Sign in with Google
        </button>
        {/*<div className="relative flex items-center my-6 w-full">*/}
        {/*  <div className="flex-grow border-t border-dark-gray"></div>*/}
        {/*  <p className="flex-shrink uppercase font-medium px-4">or</p>*/}
        {/*  <div className="flex-grow border-t border-dark-gray"></div>*/}
        {/*</div>*/}
      </div>
    </div>
  )
}