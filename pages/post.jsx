import {useRouter} from "next/router";
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";
import {auth, db} from "../utils/firebase";
import {addDoc, collection, serverTimestamp, updateDoc, doc} from "firebase/firestore";
import {toast} from "react-toastify";

export default function Post() {
	// Form state
	const [post, setPost] = useState({description: ""});
	const [user, loading] = useAuthState(auth);
	const route = useRouter();
	const routeData = route.query;

	// Submit Post
	const submitPost = async (e) => {
		e.preventDefault();

		// Run checks for description
		if (!post.description) {
			toast.error('Description field empty', {
				position: toast.POSITION.BOTTOM_RIGHT,
				autoClose: 1500
			});

			return;
		}

		if (post.description.length > 300) {
			toast.error('Description too long', {
				position: toast.POSITION.BOTTOM_RIGHT,
				autoClose: 1500
			});

			return;
		}

		if (post?.hasOwnProperty("id")) {
			const docRef = doc(db, "posts", post.id);
			const updatedPost = {...post, timestamp: serverTimestamp()}
			await updateDoc(docRef, updatedPost);
			return route.push('/');
		} else {
			// Make a new post
			const collectionRef = collection(db, "posts");
			await addDoc(collectionRef, {
				...post,
				timestamp: serverTimestamp(),
				user: user?.uid,
				avatar: user?.photoURL,
				username: user?.displayName,
			});

			setPost({description: ""});
			toast.success("Post has been made 🚀", {
				position: toast.POSITION.BOTTOM_RIGHT,
				autoClose: 1500,
			});
			return route.push('/');
		}
	}

	// Check our user
	const checkUser = async () => {
		if (loading) return;
		if (!user) return route.push('/auth/login');
		if (routeData.id) {
			setPost({description: routeData.description, id: routeData.id});
		}
	}
	useEffect(() => {
		checkUser();
	}, [user, loading]);

	return (
		<div className="my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto bg-black">
			<form onSubmit={submitPost}>
				<h1 className="text-2xl font-bold">
					{post.hasOwnProperty("id") ? "Edit your post" : "Create a new post"}
				</h1>
				<div className="py-7">
					<textarea
						value={post.description}
						onChange={(e) => setPost({...post, description: e.target.value})}
						className="bg-gray-800 h-48 w-full rounded-lg p-4 text-sm bg-dark-blue outline-0"
						placeholder="What's happening?"
					></textarea>
					<p className={`font-medium text-sm mt-2 ${
						post.description.length > 300 ? 'text-red' : 'text-gray'
					}`}
					>
						{post.description.length}/300
					</p>
				</div>
				<button
					type="submit"
					className="w-full bg-cyan-600 text-white text-medium p-2 rounded-lg text-sm bg-blue hover:bg-blue/70 transition-colors"
				>
					Submit
				</button>
			</form>
		</div>
	)

}