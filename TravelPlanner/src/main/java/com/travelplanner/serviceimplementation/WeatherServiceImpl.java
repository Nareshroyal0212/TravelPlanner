package com.travelplanner.serviceimplementation;

import org.springframework.stereotype.Service;

import com.travelplanner.service.WeatherService;

@Service
public class WeatherServiceImpl implements WeatherService {

    @Override
    public String getWeather(String city) {

        return "Weather information for " + city +
                " will be integrated using Weather API.";

    }

}