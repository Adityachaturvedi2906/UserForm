import React from 'react';
import useAuthenticationCheck from '../hooks/useAuthenticationCheck';
import Header from './Header';
import UserForm from './UserForm';

const Home = () => {
	useAuthenticationCheck();

	return (
		<div className="bg-[#ddd0c833]  flex flex-col flex-1">
			<Header />
			<UserForm />
		</div>
	);
};

export default Home;
