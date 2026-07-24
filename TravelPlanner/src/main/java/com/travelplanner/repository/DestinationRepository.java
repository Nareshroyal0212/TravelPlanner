package com.travelplanner.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travelplanner.model.Destination;

public interface DestinationRepository extends JpaRepository<Destination, Long> {

}