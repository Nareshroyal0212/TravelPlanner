package com.travelplanner.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.travelplanner.model.Budget;

public interface BudgetRepository extends JpaRepository<Budget, Long> {

}