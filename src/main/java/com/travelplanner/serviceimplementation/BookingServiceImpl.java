package com.travelplanner.serviceimplementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelplanner.model.Booking;
import com.travelplanner.repository.BookingRepository;
import com.travelplanner.service.BookingService;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id).orElse(null);
    }

    @Override
    public Booking updateBooking(Long id, Booking booking) {

        Booking existing = bookingRepository.findById(id).orElse(null);

        if (existing != null) {

            existing.setCustomerName(booking.getCustomerName());
            existing.setDestination(booking.getDestination());
            existing.setHotelName(booking.getHotelName());
            existing.setCheckInDate(booking.getCheckInDate());
            existing.setCheckOutDate(booking.getCheckOutDate());
            existing.setNumberOfGuests(booking.getNumberOfGuests());
            existing.setTotalAmount(booking.getTotalAmount());

            return bookingRepository.save(existing);
        }

        return null;
    }

    @Override
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}