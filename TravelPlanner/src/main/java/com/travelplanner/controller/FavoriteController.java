package com.travelplanner.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.travelplanner.model.Favorite;
import com.travelplanner.service.FavoriteService;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "*")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @PostMapping
    public Favorite saveFavorite(@RequestBody Favorite favorite) {
        return favoriteService.saveFavorite(favorite);
    }

    @GetMapping
    public List<Favorite> getAllFavorites() {
        return favoriteService.getAllFavorites();
    }

    @GetMapping("/{id}")
    public Favorite getFavorite(@PathVariable Long id) {
        return favoriteService.getFavoriteById(id);
    }

    @PutMapping("/{id}")
    public Favorite updateFavorite(@PathVariable Long id,
                                   @RequestBody Favorite favorite) {
        return favoriteService.updateFavorite(id, favorite);
    }

    @DeleteMapping("/{id}")
    public String deleteFavorite(@PathVariable Long id) {
        favoriteService.deleteFavorite(id);
        return "Favorite Deleted Successfully";
    }
}