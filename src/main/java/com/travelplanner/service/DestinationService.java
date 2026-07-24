package com.travelplanner.service;

import java.util.List;

import com.travelplanner.model.Destination;

public interface DestinationService {

    Destination saveDestination(Destination destination);

    List<Destination> getAllDestinations();

    Destination getDestinationById(Long id);

    Destination updateDestination(Long id, Destination destination);

    void deleteDestination(Long id);

}