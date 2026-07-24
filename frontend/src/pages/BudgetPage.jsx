import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import "../styles/budget.css";
import { getAllBudgets, saveBudget } from "../services/budgetService";

function BudgetPage() {
  const [budget, setBudget] = useState("");
  const [hotel, setHotel] = useState("");
  const [food, setFood] = useState("");
  const [transport, setTransport] = useState("");
  const [shopping, setShopping] = useState("");
  const [remaining, setRemaining] = useState(0);

  const [savedBudgets, setSavedBudgets] = useState([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Load previously saved budgets from the database
  useEffect(() => {
    loadBudgets();
  }, []);

  const loadBudgets = () => {
    getAllBudgets()
      .then((res) => {
        // Ensure res.data is an array before setting state
        setSavedBudgets(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => setError("Could not load saved budgets."));
  };

  const calculateBudget = () => {
    const totalExpense =
      Number(hotel) + Number(food) + Number(transport) + Number(shopping);

    const remainingBudget = Number(budget) - totalExpense;
    setRemaining(remainingBudget);

    setSaving(true);
    
    // CRITICAL FIX: Match the mandatory keys expected by your MySQL database schema
    const budgetPayload = {
      totalBudget: Number(budget) || 0,
      totalExpense: totalExpense,
      remainingBudget: remainingBudget,
      currency: "INR", 
      userId: 1, // FIX: Your database column 'user_id' is NOT NULL. Replace 1 with your actual auth user ID variable if available.
    };

    saveBudget(budgetPayload)
      .then((res) => {
        // Appends the newly created database object to the layout array instantly
        setSavedBudgets((prev) => [...prev, res.data]);
        setError("");
      })
      .catch((err) => {
        console.error(err); // Check exact network code in browser console
        setError("Could not save this budget to the database.");
      })
      .finally(() => setSaving(false));
  };

  return (
    <>
      <Navbar />

      <div className="budget-page">
        <div className="budget-header">
          <p>PLAN YOUR TRIP</p>
          <h1>Travel Budget Calculator</h1>
          <span>Manage your expenses and enjoy stress-free travel.</span>
        </div>

        <div className="budget-card">
          <h2>Trip Expenses</h2>

          <table>
            <thead>
              <tr>
                <th>Expense Category</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Total Budget</td>
                <td>
                  <input
                    type="number"
                    placeholder="Enter Budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td>🏨 Hotel Expense</td>
                <td>
                  <input
                    type="number"
                    placeholder="Hotel Cost"
                    value={hotel}
                    onChange={(e) => setHotel(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td>🍔 Food Expense</td>
                <td>
                  <input
                    type="number"
                    placeholder="Food Cost"
                    value={food}
                    onChange={(e) => setFood(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td>🚕 Transport Expense</td>
                <td>
                  <input
                    type="number"
                    placeholder="Transport Cost"
                    value={transport}
                    onChange={(e) => setTransport(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td>🛍 Shopping Expense</td>
                <td>
                  <input
                    type="number"
                    placeholder="Shopping Cost"
                    value={shopping}
                    onChange={(e) => setShopping(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <button onClick={calculateBudget} disabled={saving}>
            {saving ? "Saving..." : "Calculate & Save Budget"}
          </button>

          {error && <p className="error-text">{error}</p>}

          <div className="budget-result">
            <h2>Remaining Budget</h2>
            <h1>₹ {remaining}</h1>
          </div>
        </div>

        {/* This table renders data onto the webpage dynamically */}
        <div className="budget-card">
          <h2>Saved Budgets History</h2>
          {savedBudgets.length === 0 ? (
            <p>No saved budgets found in history.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Total Budget</th>
                  <th>Total Expense</th>
                  <th>Remaining</th>
                </tr>
              </thead>
              <tbody>
                {savedBudgets.map((b) => (
                  <tr key={b.id || Math.random()}>
                    <td>₹ {b.totalBudget ?? b.total_budget}</td>
                    <td>₹ {b.totalExpense ?? b.total_expense}</td>
                    <td>₹ {b.remainingBudget ?? b.remaining_budget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default BudgetPage;
