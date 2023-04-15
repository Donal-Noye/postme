import Message from "../components/Message";
import {useEffect, useState} from "react";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "../utils/firebase";
import Link from "next/link";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
	// Create a state with all the posts
	const [allPosts, setAllPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const getPosts = async () => {
		setIsLoading(true);

		const collectionRef = collection(db, 'posts');
		const q = query(collectionRef, orderBy('timestamp', 'desc'))
		const unsubscribe = onSnapshot(q, (snapshot) => {
			setAllPosts(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));

			setIsLoading(false);
		})

		return unsubscribe;
	}
	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div className="my-12 text-lg font-medium">
			<h2>See what other people are saying</h2>
			{isLoading ? <LoadingSpinner /> : allPosts.map(post =>
				<Message key={post.id} {...post}>
					<div className="flex justify-end">
						<Link href={{pathname: `/${post.id}`, query: {...post}}}>
							<button className="text-[16px] text-gray hover:text-gray/70">
								{post.comments?.length > 0 ? post.comments?.length : 0} comments
							</button>
						</Link>
					</div>
				</Message>)}
		</div>
	)
}
