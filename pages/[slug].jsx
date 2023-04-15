import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Message from "../components/Message";
import {auth, db} from "../utils/firebase";
import {toast} from "react-toastify";
import {arrayUnion, doc, getDoc, onSnapshot, Timestamp, updateDoc} from "firebase/firestore";
import {AiOutlineSend} from "react-icons/ai";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Details() {
	const router = useRouter();
	const routeData = router.query;
	const [message, setMessage] = useState("");
	const [allMessage, setAllMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	//Submit a message
	const submitMessage = async (e) => {
		//Check if the user is logged
		if (!auth.currentUser) return router.push("/auth/login");

		if (!message) {
			toast.error("Don't leave an empty message 😅", {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 1500,
			});
			return;
		}
		const docRef = doc(db, "posts", routeData.id);
		await updateDoc(docRef, {
			comments: arrayUnion({
				message,
				avatar: auth.currentUser.photoURL,
				userName: auth.currentUser.displayName,
				time: Timestamp.now(),
			}),
		});
		setMessage("");
	};

	//Get Comments
	const getComments = async () => {
		setIsLoading(true);
		const docRef = doc(db, "posts", routeData.id);
		const unsubscribe = onSnapshot(docRef, (snapshot) => {
			try {
				setAllMessages(snapshot.data().comments);
			} catch (e) {
				console.log(e)
			}

			setIsLoading(false);
		});
		return unsubscribe;
	};

	useEffect(() => {
		if (!router.isReady) return;
		getComments();
	}, [router.isReady]);
	return (
		<div>
			<Message {...routeData}></Message>
			<div className="my-4 bg-black rounded-[16px] p-8">
				<div className="flex gap-4">
					<input
						onChange={(e) => setMessage(e.target.value)}
						type="text"
						value={message}
						placeholder="Write a comment..."
						className="bg-gray-800 w-full px-6 py-3 outline-0 text-white text-sm rounded-lg bg-dark-blue"
					/>
					<button
						onClick={submitMessage}
						type="submit"
						className="bg-cyan-500 text-white py-2 px-4 bg-dark-blue rounded-lg hover:bg-blue transition-colors"
					>
						<AiOutlineSend size={20} />
					</button>
				</div>
				{!allMessage ? '' :
					<div className="py-6">
						<h2 className="font-bold">Comments</h2>

						{isLoading ? <LoadingSpinner /> : allMessage?.map((message) => (
							<div className="bg-dark-blue p-4 my-4 rounded-lg" key={message.time}>
								<div className="flex items-center gap-4 mb-4">
									<img
										className="w-8 rounded-full"
										src={message.avatar}
										alt=""
									/>
									<p className="text-sm">{message.userName}</p>
								</div>
								<p>{message.message}</p>
							</div>
						))}
					</div>
				}
			</div>
		</div>
	);
}