package com.travelplanner.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import com.travelplanner.model.Favorite;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    @Modifying
    @Transactional
    void deleteByUserId(Long userId);
}