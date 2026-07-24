package com.travelplanner.service;

import com.travelplanner.model.User;

public interface AuthService {

    User register(User user);

    User login(String email, String password);

}