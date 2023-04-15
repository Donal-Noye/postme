import Link from "next/link"
import {auth} from "../utils/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {IoCreateOutline} from "react-icons/io5";
import {AiOutlineLogin} from "react-icons/ai";

export default function Nav() {
	const [user, loading] = useAuthState(auth);

	return (
		<nav className="flex justify-between items-center py-6 px-10 bg-black">
			<Link href="/">
				<button className="text-lg font-medium">Postme</button>
			</Link>
			<div className="flex items-center gap-10">
				{!user && (
					<Link href={'/auth/login'} legacyBehavior>
						<button
							className="flex items-center gap-1 py-2 px-4 text-sm bg-cyan-500 text-white hover:text-white/70 transition-colors rounded-lg font-medium ml-8 cursor-pointer"
						>
							<AiOutlineLogin size={20} />
							Join Now
						</button>
					</Link>
				)}
				{user && (
					<div className="flex items-center gap-6">
						<Link href="/post">
							<button className="flex items-center gap-2 bg-dark-blue rounded-lg font-medium bg-cyan-500 text-white py-2 px-4 rounded-mg text-sm">
								<IoCreateOutline size={20} />
								Create Post
							</button>
						</Link>
						<Link href='/dashboard'>
							<button className="flex items-center bg-dark-blue rounded-lg">
								<p className="px-4 text-sm">{user.displayName}</p>
								<img className="w-9 rounded-lg cursor-pointer" src={user.photoURL} alt=""/>
							</button>
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
}