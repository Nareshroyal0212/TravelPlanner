package com.travelplanner.service;

import java.util.List;
import com.travelplanner.model.Favorite;

public interface FavoriteService {

    Favorite saveFavorite(Favorite favorite);

    List<Favorite> getAllFavorites();

    Favorite getFavoriteById(Long id);

    Favorite updateFavorite(Long id, Favorite favorite);

    void deleteFavorite(Long id);
}