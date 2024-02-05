import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth'; // Import the signOut function from your firebase/auth library
import { auth } from '../utils/firebase';
const Header = () => {
	const navigate = useNavigate();

	const handleSignOut = async () => {
		try {
			await signOut(auth);
			navigate('/');
		} catch (error) {
			console.error('Error signing out:', error);
		}
	};
	return (
		<div className='bg-[#ddd0c867] w-full'>
			<div className='flex justify-between items-center p-4'>
				<div>
					<h2>
						Company Logo
					</h2>
				</div>
				<div>
					<button
						className="p-2 mx-14 border-[1px] border-[#858585] text-[#323232] font-semibold text-sm hover:bg-[#32323222]"
						onClick={handleSignOut}
					>
						Sign Out  <span className='mx-1'><i className="fa fa-sign-out" aria-hidden="true"></i></span>
					</button>
				</div>
			</div>
		</div>
	)
}

export default Header