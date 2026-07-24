package com.travelplanner.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.travelplanner.model.Budget;
import com.travelplanner.service.BudgetService;

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = "*")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @PostMapping
    public Budget saveBudget(@RequestBody Budget budget) {
        // DEBUG LOGS: Run your frontend and check your Spring Boot terminal console!
        System.out.println("=== INCOMING BUDGET SAVE REQUEST ===");
        System.out.println("Total Budget received: " + budget.getTotalBudget());
        System.out.println("Total Expense received: " + budget.getTotalExpense());
        System.out.println("Remaining Budget received: " + budget.getRemainingBudget());
        System.out.println("User ID received: " + budget.getUserId());
        System.out.println("=====================================");

        if (budget.getUserId() == null) {
            System.out.println("⚠️ WARNING: User ID is NULL! Setting a temporary fallback ID to prevent crash.");
            budget.setUserId(1L); // Force fallback value to guarantee database insert success
        }

        return budgetService.saveBudget(budget);
    }

    @GetMapping
    public List<Budget> getAllBudgets() {
        return budgetService.getAllBudgets();
    }

    @GetMapping("/{id}")
    public Budget getBudget(@PathVariable Long id) {
        return budgetService.getBudgetById(id);
    }

    @PutMapping("/{id}")
    public Budget updateBudget(@PathVariable Long id, @RequestBody Budget budget) {
        return budgetService.updateBudget(id, budget);
    }

    @DeleteMapping("/{id}")
    public String deleteBudget(@PathVariable Long id) {
        budgetService.deleteBudget(id);
        return "Budget Deleted Successfully";
    }
}
