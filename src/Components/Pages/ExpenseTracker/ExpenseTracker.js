import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Store/AuthContext';
import './ExpenseTracker.css';
import { toggleDarkMode } from '../../Store/store';
import { useDispatch, useSelector } from 'react-redux';


const ExpenseTracker = () => {
   
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.darkMode);


  const authctx = useContext(AuthContext);
  const [moneySpent, setMoneySpent] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showToggle, setShowToggle] = useState(false);

  const userEmail = localStorage.getItem('email');
  const userName = userEmail && userEmail.split('@')[0];

  useEffect(() => {
    setShowToggle(Number(moneySpent) > 1000);
  }, [moneySpent]);


  useEffect(() => {
    fetch(`https://react-http-8e0dd-default-rtdb.firebaseio.com/expenses/${userName}.json`)
      .then((res) => {
        if (res.ok) { return res.json(); }
      })
      .then(data => {
        if (data) {
          const fetchedExpenses = Object.keys(data).map(key => ({ id: key, ...data[key] }));
          setExpenses(fetchedExpenses);
        }
      });
  }, [userName]);


  const handleSubmit = (event) => {
    event.preventDefault();
    const obj = { moneySpent, description, category };
    fetch(`https://react-http-8e0dd-default-rtdb.firebaseio.com/expenses/${userName}.json`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => { 
      setExpenses([...expenses, { id: data.name, ...obj }]);
    })
    .catch(error => alert(error));

    setMoneySpent('');
    setDescription('');
    setCategory('');
  };

  const emailVerification = () => {
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=YOUR_API_KEY', {
      method: 'POST',
      body: JSON.stringify({ requestType: 'VERIFY_EMAIL', idToken: authctx.token }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        alert('An email verification link has been sent to your email address.')
      })
      .catch(error => alert(error));
  }

  const handleDelete = (id) => {
    fetch(`https://react-http-8e0dd-default-rtdb.firebaseio.com/expenses/${userName}/${id}.json`, {
      method: 'DELETE'
    })
    .then(() => {
      setExpenses(expenses.filter(expense => expense.id !== id));
      console.log("Expense successfully deleted");
    })
    .catch(error => alert(error));
  };

  const handleEdit = (item) => {
    setEditingExpense(item);
    setMoneySpent(item.moneySpent);
    setDescription(item.description);
    setCategory(item.category);
  };

  const handleUpdate = (event) => {
  
    event.preventDefault();

    const updatedExpense = { moneySpent, description, category };

    fetch(`https://react-http-8e0dd-default-rtdb.firebaseio.com/expenses/${editingExpense.id}.json`, {
      method: 'PUT',
      body: JSON.stringify(updatedExpense),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(() => {
      setExpenses(expenses.map(expense => {
        if (expense.id === editingExpense.id) {
          return { ...expense, ...updatedExpense };
        }
        return expense;
      }));
      console.log("Expense successfully updated");
      setEditingExpense(null);
    })
    .catch(error => alert(error));
    setMoneySpent('');
    setDescription('');
    setCategory('');
  };

   const toggleDarkModeHandler = () => { 
    dispatch(toggleDarkMode());
  };

  return (
    <>
    <video autoPlay muted loop className="video-background">
  <source src="https://videos.pexels.com/video-files/10004432/10004432-sd_960_506_30fps.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

    <div className={`expense-tracker-container ${darkMode ? 'dark-mode' : ''}`}> {/* 3. Applying dark mode class conditionally */}

      <h1 style={{color:"white"}}>WELCOME TO ExpenseTracker!</h1>
      <h2>Your user profile is incomplete.</h2>
      <Link className='complete' to='/completeprofile'>complete now</Link>
      <button type='button' className='verify' onClick={emailVerification}>Verify Email</button>

      <h2>Enter Expense Details</h2>
      <form onSubmit={editingExpense ? handleUpdate : handleSubmit}>
        <div>
          <label>Money Spent:</label>
          <input type="number" value={moneySpent} onChange={(e) => setMoneySpent(e.target.value)} required />
        </div>

        {/* <div>
          <label>Description:</label>
          <input  type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div> */}

        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
          </select>
        </div>
        <button type="submit">{editingExpense ? 'update' : 'Submit'}</button>
      </form>

      {showToggle && (
        <div>
          <button type="button" onClick={toggleDarkModeHandler} style={{backgroundColor:"black"}}>Turn On Dark Mode</button>
        </div>
      )}

      <div>
        <h2>🅴🆇🅿🅴🅽🆂🅴 🅻🅸🆂🆃:-</h2>
        <ul>
          {expenses.map((item, index) => (
            <li key={index}>
              Money Spent: {item.moneySpent}
              Description: {item.description}
              Category: {item.category}
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => { handleDelete(item.id) }}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default ExpenseTracker;




