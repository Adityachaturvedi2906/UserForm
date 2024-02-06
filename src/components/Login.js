import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { checkValidData } from '../utils/validate';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Login = () => {
	const [isSignInForm, setIsSignInForm] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const [loading, setLoading] = useState(false);
	const name = useRef(null);
	const email = useRef(null);
	const password = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		const checkAuthentication = () => {
			const user = auth.currentUser;

			if (user) {
				// User is logged in, redirect to /home
				navigate('/home');
			} else {
				// User is not logged in, redirect to /
				navigate('/');
			}
		};

		checkAuthentication();
	}, [auth, navigate]);

	const handleButtonClick = () => {
		setLoading(true);
		let message;

		if (!isSignInForm) {
			message = checkValidData(email.current.value, password.current.value);
			setErrorMessage(message);
		} else {
			message = checkValidData(email.current.value, password.current.value);
			setErrorMessage(message);
		}

		if (message) {
			setLoading(false);
			return;
		}

		if (!isSignInForm) {
			createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
				.then((userCredential) => {
					const user = userCredential.user;
					updateProfile(user, {
						displayName: name.current.value,
					})
						.then(() => {
							setIsSignInForm(!isSignInForm);
						})
						.catch((error) => {
							setErrorMessage(error.message);
						})
						.finally(() => {
							setLoading(false);
							if (name.current) name.current.value = '';
							if (email.current) email.current.value = '';
							if (password.current) password.current.value = '';
						});
				})
				.catch((error) => {
					setErrorMessage(error.message);
					setLoading(false);
				});
		} else {
			signInWithEmailAndPassword(auth, email.current.value, password.current.value)
				.then((userCredential) => {
					const user = userCredential.user;
					navigate('/home');
				})
				.catch((error) => {
					setLoading(false);
					setErrorMessage('User Not Found! Kindly Register');
				});
		}
	};


	const toggleSignInForm = () => {
		setErrorMessage('');
		setIsSignInForm(!isSignInForm);
		setLoading(false);
	};

	const handleSnackbarClose = () => {
		setErrorMessage(null);
	};

	return (
		<div className="flex justify-center items-center h-screen bg-[#ddd0c867]">
			<form onSubmit={(e) => e.preventDefault()} className="rounded-2xl shadow-lg p-8 text-white border-[1px] border-[#ddd0c867] bg-[#DDD0C8]" noValidate>
				<div className="px-5">
					<h1 className="font-bold text-3xl text-black">{isSignInForm ? 'Login' : 'Sign Up'}</h1>
					<p className="text-md text-black py-2">{isSignInForm ? 'Login to your account' : 'Sign up to your account'}</p>
				</div>
				<div className=" rounded-xl p-6">
					{!isSignInForm && (
						<div className="py-1">
							<label className="text-black font-semibold text-sm">Name</label>
							<input ref={name} type="text" placeholder="Full Name" className="bg-[#EAEAEA] p-2 my-1 w-full rounded-lg text-black" />
						</div>
					)}
					<div className="py-1">
						<label className="text-black font-semibold text-sm">Email address</label>
						<input ref={email} type="email" placeholder="example@gmail.com" className="bg-[#EAEAEA] p-2 my-1 w-full rounded-lg text-black" />
					</div>
					<div className="py-1">
						<label className="text-black font-semibold text-sm">Password</label>
						<input ref={password} type="password" placeholder="••••••••" className="bg-[#EAEAEA] p-2 my-1 w-full rounded-lg text-black" />
					</div>
					{errorMessage && (
						<Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}>
							<MuiAlert elevation={8} variant="filled" severity="error" onClose={handleSnackbarClose}>
								{errorMessage}
							</MuiAlert>
						</Snackbar>
					)}
					{isSignInForm && <p className="py-1 text-sm cursor-pointer text-[#323232]">Forgot password?</p>}
					<button className="p-2 my-4 bg-[#323232] w-full rounded-lg text-white font-bold text-lg" onClick={handleButtonClick}>
						{loading ? <CircularProgress size={20} color="inherit" /> : isSignInForm ? 'Sign In' : 'Sign Up'}
					</button>
				</div>
				{isSignInForm ? (
					<p className="text-center py-1 text-sm  text-[#858585]">
						Don’t have an account? <span className="text-[#323232] cursor-pointer" onClick={toggleSignInForm}>Register here</span>
					</p>
				) : (
					<p className="  text-center text-sm text-[#858585]">
						Already registered? <span className="text-[#323232] cursor-pointer" onClick={toggleSignInForm}>Login here</span>
					</p>
				)}
			</form>
		</div>
	);
};

export default Login;
