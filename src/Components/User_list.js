/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Users ()
{

  const [ users, setUsers ] = useState( [] );
  const [ page, setPage ] = useState( 1 );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const f = async () =>
  {
    await axios.get( `https://reqres.in/api/users?page=${ page }` )
      .then( res =>
      {
        setUsers( res.data.data );
      } )
      .catch( err =>
      {
        alert( err );
      } );
  };
  useEffect( () =>
  {
    f();
  }, [] );

  // console.log( 'data', users );

  console.log( page );

  return (
    <>
      <div className="user-list">
        <h1 className='h2 mt-5 fw-bold'>Hello ReqRes users!</h1>
        {/* <div className="user-list-flex">
          {users.length &&
            users.map( ( user ) =>
            {
              return (
                <div key={user.id}>
                  <p>
                    <strong>{user.first_name}</strong>
                  </p>
                  <p>{user.email}</p>
                  <img key={user.avatar} src={user.avatar} alt={user.first_name} />
                </div>
              );
            } )}
        </div> */}
        <div className='mx-5'>
          <table className="table table-dark table-hover mt-5">
            <thead>
              <tr>
                <th scope="col" className="col">Id</th>
                <th scope="col" className="col">Profile</th>
                <th scope="col" className="col">Name</th>
                <th scope="col" className="col">Email Address</th>
              </tr>
            </thead>

            <tbody>
              {users.map( ( user, index ) =>
              {
                return (
                  <tr key={index}>
                    <td>{user.id}</td>
                    <td><img key={user.avatar} src={user.avatar} alt={user.first_name} width={40} className='rounded-circle' /></td>
                    <td>{user.first_name}</td>
                    <td>{user.email}</td>
                  </tr>
                );
              } )}
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul className="pagination position-absolute start-50  translate-middle-x">
              <li className="page-item">
                <a className="page-link" href="void:" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item"><a className="page-link" onClick={() =>
              {
                setPage( 1 );
                f();
              }
              }>1</a></li>
              <li className="page-item"><a className="page-link" onClick={() =>
              {
                setPage( 2 );
                f();
              }}>2</a></li>

              <li className="page-item">
                <a className="page-link" href="void:" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

      </div>
    </>
  );
}

export default Users;