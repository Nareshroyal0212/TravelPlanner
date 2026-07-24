package com.travelplanner.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.travelplanner.model.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Long> {

}