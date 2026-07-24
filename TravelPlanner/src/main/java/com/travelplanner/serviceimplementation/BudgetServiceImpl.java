package com.travelplanner.serviceimplementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelplanner.model.Budget;
import com.travelplanner.repository.BudgetRepository;
import com.travelplanner.service.BudgetService;

@Service
public class BudgetServiceImpl implements BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Override
    public Budget saveBudget(Budget budget) {
        budget.setRemainingBudget(
                budget.getTotalBudget() - budget.getTotalExpense());
        return budgetRepository.save(budget);
    }

    @Override
    public List<Budget> getAllBudgets() {
        return budgetRepository.findAll();
    }

    @Override
    public Budget getBudgetById(Long id) {
        return budgetRepository.findById(id).orElse(null);
    }

    @Override
    public Budget updateBudget(Long id, Budget budget) {

        Budget existing = budgetRepository.findById(id).orElse(null);

        if (existing != null) {

            existing.setTotalBudget(budget.getTotalBudget());
            existing.setTotalExpense(budget.getTotalExpense());
            existing.setRemainingBudget(
                    budget.getTotalBudget() - budget.getTotalExpense());

            return budgetRepository.save(existing);
        }

        return null;
    }

    @Override
    public void deleteBudget(Long id) {
        budgetRepository.deleteById(id);
    }
}