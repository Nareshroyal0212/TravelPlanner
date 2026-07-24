package com.travelplanner.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.travelplanner.model.Favorite;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

}