package com.travelplanner.serviceimplementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelplanner.model.Favorite;
import com.travelplanner.repository.FavoriteRepository;
import com.travelplanner.service.FavoriteService;

@Service
public class FavoriteServiceImpl implements FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Override
    public Favorite saveFavorite(Favorite favorite) {
        return favoriteRepository.save(favorite);
    }

    @Override
    public List<Favorite> getAllFavorites() {
        return favoriteRepository.findAll();
    }

    @Override
    public Favorite getFavoriteById(Long id) {
        return favoriteRepository.findById(id).orElse(null);
    }

    @Override
    public Favorite updateFavorite(Long id, Favorite favorite) {

        Favorite existing = favoriteRepository.findById(id).orElse(null);

        if (existing != null) {
            existing.setPlaceName(favorite.getPlaceName());
            existing.setCategory(favorite.getCategory());
            existing.setDescription(favorite.getDescription());

            return favoriteRepository.save(existing);
        }

        return null;
    }

    @Override
    public void deleteFavorite(Long id) {
        favoriteRepository.deleteById(id);
    }
}