'use client';
import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import NavItems from '../Utils/NavItems';
import Login from '../Components/Auth/Login';
import SignUp from '../Components/Auth/SignUp';
import Verification from '../Components/Auth/Verification';
import CustomModal from '../Utils/CustomModal';
import { ThemeSwitcher } from '../Utils/ThemeSwitcher';
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import avatar from '../../public/assests/avatar.png';
import { useSession } from 'next-auth/react';
import {
	useLogoutQuery,
	useSocialAuthMutation,
} from '@/redux/features/Auth/authApi';
import toast from 'react-hot-toast';

type Props = {
	open: boolean;
	setOpen: (open: boolean) => void;
	activeItem: number;
	route: string;
	setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, open, route, setRoute }) => {
	const [openSidebar, setOpenSidebar] = useState(false);
	const [active, setActive] = useState(false);
	const { user } = useSelector((state: any) => state.auth);
	const { data } = useSession();
	const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
	const [logout, setLogout] = useState(false);
	const {} = useLogoutQuery(undefined, {
		skip: !logout ? true : false,
	});

	useEffect(() => {
		if (!user) {
			if (data) {
				socialAuth({
					email: data?.user?.email,
					name: data?.user?.name,
					avatar: data?.user?.image,
				});
			}
		}

		if (data === null) {
			setLogout(true);
		}
	}, [data, user]);

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 85) {
				setActive(true);
			} else {
				setActive(false);
			}
		});
	}

	useEffect(()=>{
		if (isSuccess) {
			toast.success('Login Successfully d');
		}

	},[isSuccess])

	const handleClose = (e: any) => {
		if (e.target.id === 'screen') {
			setOpenSidebar(false);
		}
	};
	return (
		<div className="w-full relative">
			<div
				className={`${
					active
						? 'dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full shadow-xl transiton duration-500'
						: 'w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow'
				}`}
			>
				<div className="w-95% 800px:w-[92%] m-auto py-2 h-full">
					<div className="w-full h-[80px] flex items-center justify-between p-3">
						<div>
							<Link
								href={'/'}
								className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
							>
								ELearning
							</Link>
						</div>
						<div className="flex items-center">
							<NavItems
								activeItem={activeItem}
								isMobile={false}
							/>
							<ThemeSwitcher />
							{/* {only for mobile} */}
							<div className="800px:hidden">
								<HiOutlineMenuAlt3
									size={25}
									className="cursor-pointer dark:text-white text-black"
									onClick={() => setOpenSidebar(true)}
								/>
							</div>
							{user ? (
								<Link href={'/profile'}>
									<Image
										src={user.avatar ? user.avatar : avatar}
										alt="profile-pic"
										className="w-[30px] h-[30px] rounded-full cursor-pointer"
									/>
								</Link>
							) : (
								<HiOutlineUserCircle
									size={25}
									className="hidden 800px:block cursor-pointer dark:text-white text-black"
									onClick={() => setOpen(true)}
								/>
							)}
						</div>
					</div>
				</div>
				{/* {mobile sidebar} */}
				{openSidebar && (
					<div
						className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024] "
						onClick={handleClose}
						id="screen"
					>
						<div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0 backdrop-blur-sm">
							<NavItems
								activeItem={activeItem}
								isMobile={true}
							/>
							<HiOutlineUserCircle
								size={25}
								className="cursor-pointer ml-5 my-2 text-black dark:text-white"
								onClick={() => {
									setOpen(true);
									setOpenSidebar(false);
								}}
							/>
							<br />
							<br />
							<p className="text-[16px] px-2 pl-5 text-black dark:text-white">
								Copyright © 2023 ELearning
							</p>
						</div>
					</div>
				)}
			</div>
			{route === 'Login' && (
				<>
					{open && (
						<CustomModal
							open={open}
							setOpen={setOpen}
							activeItem={activeItem}
							setRoute={setRoute}
							component={Login}
						/>
					)}
				</>
			)}
			{route === 'Sign-Up' && (
				<>
					{open && (
						<CustomModal
							open={open}
							setOpen={setOpen}
							activeItem={activeItem}
							setRoute={setRoute}
							component={SignUp}
						/>
					)}
				</>
			)}
			{route === 'Verification' && (
				<>
					{open && (
						<CustomModal
							open={open}
							setOpen={setOpen}
							activeItem={activeItem}
							setRoute={setRoute}
							component={Verification}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default Header;
