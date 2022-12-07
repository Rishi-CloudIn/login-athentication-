import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { MdOutlineVisibility } from 'react-icons/md';

function Register ()
{
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		getValues,
		trigger,
		watch,
		formState: { errors },
		reset
	} = useForm();

	const [ registration, setRegistration ] = useState( {} );

	const onInputChange = e =>
	{
		setRegistration( { ...registration, [ e.target.name ]: e.target.value } );
	};

	function onSubmit ( data )
	{
		let dataObj = {
			email: data.email,
			password: data.password
		};
		// console.log( dataObj );
		axios
			.post(
				`https://reqres.in/api/register`,
				dataObj
			)
			.then( res =>
			{
				// console.log( res.status );
				if ( res.status === 200 )
				{
					return navigate( '/login' );
				}
			} )
			.catch( err =>
			{
				alert( 'something went wrong' );
			} );
		reset();
	}


	// password toggle

	const [ passwordType, setPasswordType ] = useState( "password" );

	const togglePassword = () =>
	{
		if ( passwordType === "password" )
		{
			setPasswordType( "text" );
			return;
		}
		setPasswordType( "password" );
	};

	return (
		<div className="container">
			<h1 className='text-center h2 fw-bold mt-5'>Registration</h1>
			<div className='row'>
				<div
					className="register-container col-5 mt-4 mx-auto"
					onSubmit={handleSubmit( onSubmit )}>
					<form>
						<div className="py-3 col-12">
							<input
								name="email"
								class="form-control"
								type="text"
								placeholder="Email"
								onChange={e => onInputChange( e )}
								{...register( 'email', {
									required: 'Email is Required',
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'Invalid email address'
									}
								} )}
								onKeyUp={() =>
								{
									trigger( 'email' );
								}}
								onMouseDown={() =>
								{
									trigger( 'email' );
								}}
							/>
							{errors.email &&
								<small className="text-danger">
									{errors.email.message}
								</small>}
						</div>

						<div className='col-12 py-3'>
							<div className="input-group">
								<input
									name="password"
									class="form-control"
									type={passwordType}
									placeholder="Password"
									onChange={e => onInputChange( e )}
									{...register( 'password', {
										required: 'password is required',
										// pattern: {
										// 	value: /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/,
										// 	message: 'Value is Invalid'
										// }
									} )}
									onKeyUp={() =>
									{
										trigger( 'password' );
									}}
								/>
								<button class="btn btn-outline-secondary" type="button" onClick={togglePassword}>{passwordType === 'password' ? <i className=""><MdOutlineVisibility /></i> : <i><AiFillEyeInvisible /></i>}
								</button>

								<div className='col-12 ms-1 mt-1'>
									{errors.password &&
										<small className="text-danger">
											{errors.password.message}{' '}
										</small>}
								</div>

							</div>
						</div>


						<div className='py-3 col-12'>
							<div className="input-group w-100">
								<input
									name="cPassword"
									class="form-control"
									type={passwordType}
									placeholder="Confirm password"
									onChange={e => onInputChange( e )}
									{...register( 'cPassword', {
										required: 'Password is required'
										// pattern: {
										// 	value: /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/,
										// 	message: 'Value is Invalid'
										// }
									} )}
									onKeyUp={() =>
									{
										trigger( 'cPassword' );
									}}
								/>
								<button class="btn btn-outline-secondary" type="button" onClick={togglePassword}>{passwordType === 'password' ? <i className=""><MdOutlineVisibility /></i> : <i><AiFillEyeInvisible /></i>}
								</button>
								<div className='col-12 ms-1 mt-1'>
									{errors.cPassword &&
										<small className="text-danger">
											{errors.cPassword.message}{' '}
										</small>}
								</div>

								{/* confirm password */}
								<div className='col-12 ms-1 mt-1'>	{watch( 'password' ) !== watch( 'cPassword' ) && getValues( 'cPassword' )
									? <small className="text-danger mt-3">password not match</small>
									: null}</div>
							</div>
						</div>


						<button type="submit" className="btn btn-primary mt-3">
							Register
						</button>
					</form>
				</div>
			</div>

		</div>
	);
}

export default Register;
