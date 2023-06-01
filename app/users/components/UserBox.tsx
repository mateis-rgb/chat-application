"use client";

import getCurrentUser from "@/app/actions/getCurrentUser";
import Avatar from "@/app/components/Avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface UserBoxProps {
	data: User,
	isHoverable?: boolean
}

const UserBox: React.FC<UserBoxProps> = ({ data, isHoverable }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const session = useSession();
	
	const handleClick = useCallback(() => {
		setIsLoading(true);

		axios.post("/api/conversations", {
			userId: data.id
		})
			.then ((data) => {
				router.push(`/conversations/${data.data.id}`);
			})
			.catch((err: any) => console.error(err))
			.finally(() => setIsLoading(false));
	}, [data, router]);

	const isHoverableVerify = () => {
		if (!isHoverable) {
			return;
		}

		return handleClick;
	}

	return (
		<div onClick={isHoverableVerify} className={`w-full relative flex items-center space-x-3 bg-white p-3 ${ isHoverable ? "hover:bg-neutral-100 cursor-pointer" : "" } rounded-lg transition`}>
			<Avatar user={data} />
			<div className="min-w-0 flex-1">
				<div className="focus:outline-none">
					<div className="flex justify-between items-center mb-1">
						<p className="text-sm font-semibold text-gray-900">
							{ data.name }
							<span className="text-sm text-gray-400">
								{ session.data?.user?.email === data.email ? "   (Me)" : "" }
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserBox;