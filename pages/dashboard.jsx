import {auth, db} from "../utils/firebase";
import {useRouter} from "next/router";
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";
import {collection, deleteDoc, doc, onSnapshot, query, where} from "firebase/firestore";
import Message from "../components/Message";
import {AiFillEdit} from "react-icons/ai";
import {BsTrash2Fill} from "react-icons/bs";
import Link from "next/link";
import {IoExitOutline} from "react-icons/io5";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Dashboard() {
	const route = useRouter();
	const [user, loading] = useAuthState(auth);
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const getData = async () => {
		setIsLoading(true);
		if (loading) return;
		if (!user) return route.push('/auth/login');

		const collectionRef = collection(db, 'posts');
		const q = query(collectionRef, where('user', '==', user.uid));

		const unsubscribe = onSnapshot(q, (snapshot => {
			setPosts(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))

			setIsLoading(false);
		}));

		return unsubscribe;
	};

	// Delete Post
	const deletePost = async (id) => {
		const docRef = doc(db, 'posts', id)
		await deleteDoc(docRef)
	}

	// Get users data
	useEffect(() => {
		getData();
	}, [user, loading])

	return (
		<div className="mt-12">
			<h1 className="text-2xl font-medium">My posts</h1>
			<div>
				{isLoading ? <LoadingSpinner /> : posts.map((post) => {
					return <Message {...post} key={post.id}>
						<div className="flex gap-6">
							<button
								onClick={() => deletePost(post.id)}
								className="text-gray flex items-center justify-center gap-2 py-2 text-sm hover:text-red transition-colors"
							>
								<BsTrash2Fill className="text-2xl" />
								Delete
							</button>
							<Link href={{pathname: '/post', query: post}}>
								<button className="text-gray flex items-center justify-center gap-2 py-2 text-sm hover:text-blue transition-colors">
									<AiFillEdit className="text-2xl" />
									Edit
								</button>
							</Link>
						</div>
					</Message>
				})}
			</div>
			<button
				className="flex items-center gap-2 font-medium text-red bg-gray-800 py-2 px-4 my-6"
				onClick={() => auth.signOut()}
			>
				<IoExitOutline size={25} />
				Sign out
			</button>
		</div>
	)
}