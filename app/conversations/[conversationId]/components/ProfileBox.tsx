"use client";

import { Conversation, User } from "@prisma/client";

interface ProfileBoxProps {
	data: Conversation & {
		users: User[]
	}
}

import { useMemo } from "react";
import useOtherUser from "@/app/hooks/useOtherUser";

import Avatar from "@/app/components/Avatar";
import { IoTrash } from "react-icons/io5";
import { format } from "date-fns";

const ProfileBox: React.FC<ProfileBoxProps> = ({ data }) => {
	const otherUser = useOtherUser(data);
	
	const joinedDate = useMemo(() => {
		return format(new Date(otherUser.createdAt), 'PP');
	}, [otherUser.createdAt]);
	
	const title = useMemo(() => {
		return data.name || otherUser.name;
	}, [data.name, otherUser.name]);

	const statusText = useMemo(() => {
		if (data.isGroup) {
			return `${data.users.length} members`;
		}
		
		return "Active";
	}, [data]);

	return (
		<div className="relative mt-6 flex-1 px-4 sm:px-6">
			<div className="flex flex-col items-center">
				<div className="mb-2">
					<Avatar user={otherUser} />
				</div>
				
				<div>
					{ title }
				</div>
				
				<div className="text-sm text-gray-500">
					{ statusText }
				</div>

				<div className="flex gap-10 my-8">
					<div onClick={() => {}} className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75">
						<div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
							<IoTrash size={20} />
						</div>
						<div className="text-sm text-light text-neutral-600">
							Delete
						</div>
					</div>
				</div>
			</div>

			<div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
				<dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
					{!data.isGroup && (
						<div>
							<dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
								Email
							</dt>

							<dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
								{ otherUser.email }
							</dd>
						</div>
					)}

					{!data.isGroup && (
						<>
							<hr />
							<div>
							<dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
								Joined
							</dt>

							<dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
								<time dateTime={joinedDate}>
									{ joinedDate }
								</time>
							</dd>
						</div>
						</>
					)}
				</dl>
			</div>
		</div>
	);
}

export default ProfileBox;