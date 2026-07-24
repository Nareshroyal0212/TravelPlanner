package com.travelplanner.service;

import java.util.List;
import com.travelplanner.model.Budget;

public interface BudgetService {

    Budget saveBudget(Budget budget);

    List<Budget> getAllBudgets();

    Budget getBudgetById(Long id);

    Budget updateBudget(Long id, Budget budget);

    void deleteBudget(Long id);
}