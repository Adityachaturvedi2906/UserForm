import React from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

const UserForm = () => {
	return (
		<div className="flex flex-col justify-center items-center min-h-[90vh] p-4 md:p-8">
			<div className='flex items-center justify-center text-[#323232] w-full md:w-4/12 my-4 mx-2'>
				<hr className="border-t border-[#67615d] w-1/4 md:w-2/4 mr-4" />
				<h1 className='text-[1.10rem] md:text-xl md:w-full w-full font-semibold text-center uppercase'>Personal Details</h1>
				<hr className="border-t border-[#67615d] w-1/4 md:w-2/4 ml-4" />
			</div>
			<Formik
				initialValues={{
					firstName: '',
					lastName: '',
					phoneNumber: '',
					email: '',
					height: '',
					dob: '',
					weight: '',
					job: '',
					location: '',
					hometown: '',
					familyMember: '',
					parentDetails: '',
					relationships: [{ relationship: '', job: '' }],
				}}
				validationSchema={Yup.object().shape({
					firstName: Yup.string().required('First Name is required'),
					lastName: Yup.string().required('Last Name is required'),
					phoneNumber: Yup.string().required('Phone number is required'),
					email: Yup.string().email('Invalid email address').required('Email is required'),
					height: Yup.string().required('Height is required'),
					dob: Yup.string().required('Date of Birth is required'),
					weight: Yup.string().required('Weight is required'),
					job: Yup.string().required('Job details are required'),
					location: Yup.string().required('Location is required'),
					hometown: Yup.string().required('Hometown is required'),
					familyMember: Yup.string().required('Family member details are required'),
					parentDetails: Yup.string().required('Parent details are required'),
					relationships: Yup.array().of(
						Yup.object().shape({
							relationship: Yup.string().required('Relationship is required'),
							details: Yup.string().required('Details are required'),
						})
					),
				})}
				onSubmit={(values) => {
					// Handle form submission logic here
					console.log(values);
				}}
			>
				{({ values, errors }) => (
					<Form className="p-4 md:p-8 bg-[#ddd0c867] shadow-md rounded w-full md:w-4/12">
						<div className="mb-3 flex">
							<div className="flex-1 mr-2">
								<label htmlFor="firstName" className="block md:text-sm text-xs font-medium text-gray-800">
									First Name
								</label>
								<Field
									required
									type="text"
									id="firstName"
									name="firstName"
									className="mt-1 p-2 bg-gray-100 w-full rounded-md border-[1px] border-[#3232327e]"
								/>
								<ErrorMessage name="firstName" component="p" className="text-red-500 text-xs" />
							</div>
							<div className="flex-1 ml-2">
								<label htmlFor="lastName" className="block md:text-sm text-xs font-medium text-gray-800">
									Last Name
								</label>
								<Field
									required
									type="text"
									id="lastName"
									name="lastName"
									className="mt-1 p-2 bg-gray-100 w-full border-[1px] border-[#3232327e] rounded-md "
								/>
								<ErrorMessage name="lastName" component="p" className="text-red-500 text-xs" />
							</div>
						</div>
						<div className="mb-3 flex">
							<div className="flex-1 mr-2">
								<label htmlFor="phoneNumber" className="block md:text-sm text-xs font-medium text-gray-800">
									Phone Number
								</label>
								<Field
									required
									type="phoneNumber"
									id="phoneNumber"
									name="phoneNumber"
									className="mt-1 p-2 bg-gray-100 w-full border-[1px] border-[#3232327e] rounded-md "
								/>
								<ErrorMessage name="phoneNumber" component="p" className="text-red-500 text-xs" />
							</div>
							<div className="flex-1 ml-2">
								<label htmlFor="email" className="block md:text-sm text-xs font-medium text-gray-800">
									Email
								</label>
								<Field
									required
									type="email"
									id="email"
									name="email"
									className="mt-1 p-2 bg-gray-100 w-full border-[1px] border-[#3232327e] rounded-md "
								/>
								<ErrorMessage name="email" component="p" className="text-red-500 text-xs" />
							</div>
						</div>
						<div className="mb-3 flex items-center">
							<div className="flex-1">
								<label htmlFor="Date" className="block md:text-sm text-xs font-medium text-gray-800">
									Date Of Birth
								</label>
								<Field
									required
									type="date"
									id="Date"
									name="Date"
									className="mt-1 p-2 bg-gray-100 w-full border-[1px] border-[#3232327e] rounded-md text-md"
								/>
								<ErrorMessage name="Date" component="p" className="text-red-500 text-xs" />
							</div>
							<div className="ml-2 flex-1">
								<label htmlFor="height" className="block md:text-sm text-xs font-medium text-gray-800">
									Height
								</label>
								<Field
									required
									type="text"
									id="height"
									name="height"
									className="mt-1 p-2 bg-gray-100 w-full border-[1px] border-[#3232327e] rounded-md "
								/>
								<ErrorMessage name="height" component="p" className="text-red-500 text-xs" />
							</div>
							<div className="ml-2 flex-1">
								<label htmlFor="weight" className="block md:text-sm text-xs font-medium text-gray-800">
									Weight <span className='md:text-xs text-[0.5rem]'>(in Kgs)</span>
								</label>
								<Field
									required
									type="number"
									id="weight"
									name="weight"
									className="mt-1 p-2 bg-gray-100 w-full border-[1px] border-[#3232327e] rounded-md "
								/>
								<ErrorMessage name="weight" component="p" className="text-red-500 text-xs" />
							</div>
						</div>

						<div className='mb-3'>
							<FieldArray name="relationships">
								{({ push, remove }) => (
									<div>
										{values.relationships.map((relationship, index) => (
											<div key={index} className='flex items-center mb-1'>
												<div className="flex-1 mr-2">
													<label htmlFor={`familyDetails[${index}].relationship`} className="block md:text-sm text-xs font-medium text-gray-800">
														Relationship
													</label>
													<Field
														required
														as="select"
														id={`familyDetails[${index}].relationship`}
														name={`familyDetails[${index}].relationship`}
														className="mt-1 p-2 bg-gray-100 w-full border-[1px] border-[#3232327e] rounded-md"
													>
														<option value="">Select</option>
														<option value="mother">Mother</option>
														<option value="father">Father</option>
														<option value="sister">Sister</option>
														<option value="brother">Brother</option>
													</Field>
													<ErrorMessage name={`familyDetails[${index}].relationship`} component="p" className="text-red-500 text-xs" />
												</div>
												<div className='flex-1 ml-1'>
													<label className="block md:text-sm text-xs font-medium text-gray-800" htmlFor={`relationships.${index}.job`}>Job:</label>
													<Field required className="mt-1 p-2 bg-gray-100 w-full border-[1px] border-[#3232327e] rounded-md " type="text" id={`relationships.${index}.job`} name={`relationships.${index}.job`} />
												</div>
												<div className='mt-5'>
													<button type="button" className=' bg-[#323232] text-white py-1 px-2 md:text-sm text-xs text-center ml-2 rounded-2xl hover:bg-[#3d3d3d]' onClick={() => remove(index)} disabled={index === 0} >
														<i class="fa fa-minus" aria-hidden="true"></i>
													</button></div>
												<div className='mt-5'>
													<button type="button" className=' bg-[#323232] text-white py-1 px-2 md:text-sm text-xs text-center ml-2 rounded-2xl hover:bg-[#3d3d3d]' onClick={() => push({ relationship: '', job: '' })}>
														<i class="fa fa-plus" aria-hidden="true"></i>
													</button>
												</div>
											</div>
										))}

									</div>
								)}
							</FieldArray>
						</div>

						<div className="mb-3 flex">
							<div className="flex-1 mr-2">
								<label htmlFor="location" className="block md:text-sm text-xs font-medium text-gray-800">
									Location
								</label>
								<Field
									required
									type="location"
									id="location"
									name="location"
									className="mt-1 p-2 bg-gray-100 w-full border-[1px] border-[#3232327e] rounded-md "
								/>
								<ErrorMessage name="location" component="p" className="text-red-500 text-xs" />
							</div>
							<div className="flex-1 ml-2">
								<label htmlFor="hometown" className="block md:text-sm text-xs font-medium text-gray-800">
									Hometown
								</label>
								<Field
									required
									type="hometown"
									id="hometown"
									name="hometown"
									className="mt-1 p-2 bg-gray-100 w-full border-[1px] border-[#3232327e] rounded-md "
								/>
								<ErrorMessage name="hometown" component="p" className="text-red-500 text-xs" />
							</div>
						</div>


						<div className="mt-4">
							<button
								type="submit"
								className="w-full md:w-full bg-[#323232] text-white p-2 text-lg rounded-md hover:bg-[#3d3d3d]"
							>
								Submit
							</button>
						</div>
					</Form>)}
			</Formik>
		</div>
	);
};

export default UserForm;
