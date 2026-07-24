package com.travelplanner.serviceimplementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelplanner.model.Destination;
import com.travelplanner.repository.DestinationRepository;
import com.travelplanner.service.DestinationService;

@Service
public class DestinationServiceImpl implements DestinationService {

    @Autowired
    private DestinationRepository destinationRepository;

    @Override
    public Destination saveDestination(Destination destination) {
        return destinationRepository.save(destination);
    }

    @Override
    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }

    @Override
    public Destination getDestinationById(Long id) {
        return destinationRepository.findById(id).orElse(null);
    }

    @Override
    public Destination updateDestination(Long id, Destination destination) {

        Destination existing = destinationRepository.findById(id).orElse(null);

        if (existing != null) {
            existing.setPlaceName(destination.getPlaceName());
            existing.setState(destination.getState());
            existing.setCountry(destination.getCountry());
            existing.setDescription(destination.getDescription());
            existing.setImageUrl(destination.getImageUrl());

            return destinationRepository.save(existing);
        }

        return null;
    }

    @Override
    public void deleteDestination(Long id) {
        destinationRepository.deleteById(id);
    }

}