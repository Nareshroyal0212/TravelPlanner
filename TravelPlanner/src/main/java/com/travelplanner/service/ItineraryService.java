package com.travelplanner.service;

import java.util.List;

import com.travelplanner.model.Itinerary;

public interface ItineraryService {

    Itinerary saveItinerary(Itinerary itinerary);

    List<Itinerary> getAllItineraries();

    Itinerary getItineraryById(Long id);

    Itinerary updateItinerary(Long id, Itinerary itinerary);

    void deleteItinerary(Long id);
}