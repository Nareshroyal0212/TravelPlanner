package com.travelplanner.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travelplanner.model.Itinerary;

public interface ItineraryRepository extends JpaRepository<Itinerary, Long> {

}