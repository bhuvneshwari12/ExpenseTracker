import React, { useContext, useEffect, useRef, useState } from 'react';
import './CompleteProfile.css'; 
import { AuthContext } from '../../Store/AuthContext';

const CompleteProfile=()=> {
    
    const authctx=useContext(AuthContext)
    const fullNameRef = useRef(null);
    const profilePhotoUrlRef = useRef(null);
    const [displayName,setDisplayName]=useState('')
    const [photoUrl,setPhotoUrl]=useState('')

    useEffect(()=>{
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDXnYnPZvWmQikMTjFhQ4x2VjbehYit0xo',{
            method:'POST',
            body:JSON.stringify({idToken:authctx.token}),
            headers: {'Content-Type':'application/json'}        
        })
        .then(res => res.json())
        .then(data =>{
             console.log(data)
             setDisplayName(data.users[ 0 ].displayName || ' ');
             setPhotoUrl(data.users[ 0 ].photoUrl || ' ');
           } )
        .catch(error => alert(error));
    },[ ])

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullName = fullNameRef.current.value;
        const profilePhotoUrl = profilePhotoUrlRef.current.value;
        
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDXnYnPZvWmQikMTjFhQ4x2VjbehYit0xo',{
            method:'POST',
            body:JSON.stringify({idToken:authctx.token,displayName:fullName,photoUrl:profilePhotoUrl}),
            headers: {'Content-Type':'application/json'}
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => alert(error));
    };


    return (
        <div className='bg'>
            <h2 className='heading'>Contact Details</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
                
                <label>Full Name:</label><br />
                <input type="text"  ref={fullNameRef} defaultValue={displayName}required />
                <br /><br />
                
                <label>Profile Photo Url:</label><br />
                <input type="text" ref={profilePhotoUrlRef}   defaultValue={photoUrl}required/>
                <br /><br />

                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default CompleteProfile;