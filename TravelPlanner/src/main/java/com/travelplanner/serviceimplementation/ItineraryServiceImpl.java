package com.travelplanner.serviceimplementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelplanner.model.Itinerary;
import com.travelplanner.repository.ItineraryRepository;
import com.travelplanner.service.ItineraryService;

@Service
public class ItineraryServiceImpl implements ItineraryService {

    @Autowired
    private ItineraryRepository itineraryRepository;

    @Override
    public Itinerary saveItinerary(Itinerary itinerary) {
        return itineraryRepository.save(itinerary);
    }

    @Override
    public List<Itinerary> getAllItineraries() {
        return itineraryRepository.findAll();
    }

    @Override
    public Itinerary getItineraryById(Long id) {
        return itineraryRepository.findById(id).orElse(null);
    }

    @Override
    public Itinerary updateItinerary(Long id, Itinerary itinerary) {

        Itinerary existing = itineraryRepository.findById(id).orElse(null);

        if (existing != null) {
            existing.setTripName(itinerary.getTripName());
            existing.setDestination(itinerary.getDestination());
            existing.setStartDate(itinerary.getStartDate());
            existing.setEndDate(itinerary.getEndDate());
            existing.setActivities(itinerary.getActivities());

            return itineraryRepository.save(existing);
        }

        return null;
    }

    @Override
    public void deleteItinerary(Long id) {
        itineraryRepository.deleteById(id);
    }
}