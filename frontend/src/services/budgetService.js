import api from "./api";

// Backend: @RequestMapping("/api/budgets") in BudgetController.java

export const getAllBudgets = () => {
  return api.get("/budgets");
};

export const getBudgetById = (id) => {
  return api.get(`/budgets/${id}`);
};

export const saveBudget = (budget) => {
  return api.post("/budgets", budget);
};

export const updateBudget = (id, budget) => {
  return api.put(`/budgets/${id}`, budget);
};

export const deleteBudget = (id) => {
  return api.delete(`/budgets/${id}`);
};
