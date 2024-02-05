import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';

const useAuthenticationCheck = () => {
	const navigate = useNavigate();
	const [authChecked, setAuthChecked] = useState(false);

	useEffect(() => {
		const checkAuthentication = () => {
			const user = auth.currentUser;

			if (!user) {
				// User is not logged in, redirect to login page
				navigate('/');
			} else {
				// User is logged in, redirect to /home
				navigate('/home');
			}

			// Set authChecked to true after checking authentication
			setAuthChecked(true);
		};

		// Only check authentication if it has not been checked before
		if (!authChecked) {
			checkAuthentication();
		}
	}, [authChecked, navigate]);
};

export default useAuthenticationCheck;
