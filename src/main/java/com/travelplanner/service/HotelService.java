package com.travelplanner.service;

import java.util.List;
import com.travelplanner.model.Hotel;

public interface HotelService {

    Hotel saveHotel(Hotel hotel);

    List<Hotel> getAllHotels();

    Hotel getHotelById(Long id);

    Hotel updateHotel(Long id, Hotel hotel);

    void deleteHotel(Long id);

}