package com.travelplanner.serviceimplementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelplanner.model.Hotel;
import com.travelplanner.repository.HotelRepository;
import com.travelplanner.service.HotelService;

@Service
public class HotelServiceImpl implements HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    @Override
    public Hotel saveHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    @Override
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    @Override
    public Hotel getHotelById(Long id) {
        return hotelRepository.findById(id).orElse(null);
    }

    @Override
    public Hotel updateHotel(Long id, Hotel hotel) {

        Hotel existing = hotelRepository.findById(id).orElse(null);

        if (existing != null) {

            existing.setHotelName(hotel.getHotelName());
            existing.setLocation(hotel.getLocation());
            existing.setPrice(hotel.getPrice());
            existing.setRating(hotel.getRating());
            existing.setImageUrl(hotel.getImageUrl());

            return hotelRepository.save(existing);
        }

        return null;
    }

    @Override
    public void deleteHotel(Long id) {
        hotelRepository.deleteById(id);
    }
}