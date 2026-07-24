package com.travelplanner.service;

import com.travelplanner.model.User;
import java.util.List;

public interface AuthService {

    User register(User user);

    User login(String email, String password);

    List<User> getAllUsers();

    void deleteUserAndFavorites(Long userId);
}