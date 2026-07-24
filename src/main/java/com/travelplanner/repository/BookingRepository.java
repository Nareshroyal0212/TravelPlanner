package com.travelplanner.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.travelplanner.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

}