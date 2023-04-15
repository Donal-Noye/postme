export default function Message({children, avatar, username, description}) {
	// const time = {
	// 	seconds: timestamp.seconds
	// }

	// const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	// const date = new Date(time.seconds * 1000);
	// const dateFormat = date.toLocaleDateString("en-US", options);

	return (
		<div className="bg-black p-8 rounded-[16px] mt-8">
			<div className="flex items-center gap-4">
				<img className="w-10 rounded-full" src={avatar} alt=""/>
				<div>
					<h2 className="text-[15px]">{username}</h2>
					{/* {timestamp.seconds ? <p className="text-sm text-gray">{dateFormat.toString()}</p> : ''} */}
				</div>
			</div>
			<div className="py-4">
				<p className="text-[15px] font-light">{description}</p>
			</div>
			{children}
		</div>
	)
}